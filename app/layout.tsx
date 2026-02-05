import type { Metadata } from "next";
import "./globals.css";
import { Container } from "../src/components/Container";
import { Header } from "../src/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Galatic News",
    template: "%s | Galatic News",
  },
  description:
    "As últimas notícias do espaço, astronomia e exploração espacial.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />

          {children}

          <footer>
            <p className="text-6xl font-bold text-center py-8">Footer</p>
          </footer>
        </Container>
      </body>
    </html>
  );
}
