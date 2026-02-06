import { PostModel } from "../../models/post/post.model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "../../db/drizzle/index";
import { logColor } from '../../utils/log-color';
import { SIMULATE_WAIT_IN_MS } from "../../lib/constants"
import { asyncDelay } from "../../utils/async-delay"

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAllPublic', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findBySlugPublic', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAll', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findById', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado para ID');

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
