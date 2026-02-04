import { Container } from "@/src/components/Container";
import { PostsList } from "@/src/components/PostList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <header>
        <h1 className="text-6xl font-bold text-center py-8">Aqui é a HEADER</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className="text-6xl font-bold text-center py-8">Footer</p>
      </footer>
    </Container>
  );
}
