"use server";

import { drizzleDb } from "../../../src/db/drizzle";
import { postsTable } from "../../../src/db/drizzle/schemas";
import { PostModel } from "../../models/post/post.model";
import { makePartialPublicPost, PublicPost } from "../../dto/post/dto";
import { PostCreateSchema } from "../../../src/lib/post/validations";
import { getZodErrorMessages } from "../../../src/utils/get-zod-error-messages";
import { makeSlugFromText } from "../../../src/utils/make-slug-from-text";
import { v4 as uuidV4 } from "uuid";

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  await drizzleDb.insert(postsTable).values(newPost);
  revalidateTag('posts', 'default');
  redirect(`/admin/post/${newPost.id}`);
}
