import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export function PostFeatured() {
  const slug = "qualquer";
  const postLink = `/post/${slug}`;

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: "/images/news_01.png",
          alt: "Alt da imagem",
          priority: true,
        }}
      />

      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          className="text-slate-600 block text-sm/tight"
          dateTime="2025-04-20"
        >
          10/04/2019 10:00
        </time>

        <PostHeading as="h1" url={postLink}>
          Dia histórico para a ciência: revelada a primeira imagem de buraco
          negro
        </PostHeading>

        <p>
          Event Horizon Telescope, rede de oito observatórios ao redor do mundo,
          divulgou hoje a primeira imagem real de um buraco negro supermassivo,
          fenômeno previsto por Einstein
        </p>
      </div>
    </section>
  );
}
