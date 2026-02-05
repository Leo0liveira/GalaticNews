import { PostsList } from "@/src/components/PostList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
import { PostFeatured } from "@/src/components/PostFeatured";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
