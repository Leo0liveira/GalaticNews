import { PostsList } from "@/src/components/PostList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { PostFeatured } from "@/src/components/PostFeatured";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
        <PostFeatured />

        <PostsList />
      </Suspense>
    </>
  );
}
