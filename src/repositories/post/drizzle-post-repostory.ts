import { PostModel } from "../../models/post/post.model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "../../db/drizzle/index";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    console.log("\n", "D findAllPublic", "\n");

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log("\n", "D findBySlugPublic", "\n");

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado para slug");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    console.log("\n", "D findAll", "\n");
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    console.log("\n", "D findById", "\n");
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error("Post não encontrado para ID");

    return post;
  }
}

// (async () => {
//   //   nasa-novos-detalhes-materia-escura-webb false
//   // hubble-ngc-4388-perdendo-gas-aglomerado-virgem true
//   //   f5d6a9e2-3c0b-4d4b-8e2c-11bb2fb0a9ad false
//   // 2b2c5a5e-6e8e-4bb4-8c27-3cf31a07d61a true
//   const repo = new DrizzlePostRepository();
//   // const posts = await repo.findAllPublic();
//   // posts.forEach(post => console.log(post.id, post.published));
//   const post = await repo.findBySlugPublic(
//     "hubble-ngc-4388-perdendo-gas-aglomerado-virgem ",
//   );
//   console.log(post);
// })();
