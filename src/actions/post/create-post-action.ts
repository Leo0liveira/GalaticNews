"use server";

import { PostModel } from "../../models/post/post.model";
import { postRepository } from "../../../src/repositories/post";
import { PostCreateSchema } from "../../../src/lib/post/validations";
import { makePartialPublicPost, PublicPost } from "../../dto/post/dto";
import { getZodErrorMessages } from "../../../src/utils/get-zod-error-messages";
import { makeSlugFromText } from "../../../src/utils/make-slug-from-text";
import { asyncDelay } from "../../../src/utils/async-delay";
import { v4 as uuidV4 } from "uuid";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado

  await asyncDelay(3000);

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

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("posts", "default");
  redirect(`/admin/post/${newPost.id}?created=1`);
}
