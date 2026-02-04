import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { PostsList } from "@/src/components/PostList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className="text-6xl font-bold text-center py-8">Footer</p>
      </footer>
    </Container>
  );
}
