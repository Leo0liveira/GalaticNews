import { DrizzlePostRepository } from './drizzle-post-repostory';
import { PostRepository } from './post-repository';

export const postRepository: PostRepository = new DrizzlePostRepository();