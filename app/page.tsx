import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { PostsList } from "@/src/components/PostList";
import { SpinLoader } from "@/src/components/SpinLoader";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link className="w-full h-full overflow-hidden rounded-xl" href="#">
          <Image
            className="w-full h-full object-cover object-center group-hover:scale-105 transition"
            src="/images/news_01.png"
            width={1200}
            height={720}
            alt="Título do post"
            priority
          />
        </Link>
        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            className="text-slate-600 block text-sm/tight"
            dateTime="2025-04-20"
          >
            20/04/2025 10:00
          </time>

          <h1 className="text-2xl/tight font-extrabold sm:text-4xl">
            <Link href="#">
              Dia histórico para a ciência: revelada a primeira imagem de buraco
              negro
            </Link>
          </h1>

          <p>
            Event Horizon Telescope, rede de oito observatórios ao redor do
            mundo, divulgou hoje a primeira imagem real de um buraco negro
            supermassivo, fenômeno previsto por Einstein
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer>
        <p className="text-6xl font-bold text-center py-8">Footer</p>
      </footer>
    </Container>
  );
}
