import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

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

      <PostSummary
        postLink={postLink}
        postHeading="h1"
        createdAt={"2019-04-10T00:24:38.616Z"}
        excerpt={
          "Event Horizon Telescope, rede de oito observatórios ao redor do mundo, divulgou hoje a primeira imagem real de um buraco negro supermassivo, fenômeno previsto por Einstein"
        }
        title={
          "Dia histórico para a ciência: revelada a primeira imagem de buraco negro"
        }
      />
    </section>
  );
}
