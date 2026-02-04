import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galatic News",
  description:
    "As últimas notícias do espaço, astronomia e exploração espacial.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
