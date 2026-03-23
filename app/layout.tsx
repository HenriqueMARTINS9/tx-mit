import type { Metadata } from "next";
import "video.js/dist/video-js.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Démo d'intégration vidéo",
  description:
    "Une démo client qui compare l'intégration iframe, SDK et la lecture vidéo mobile native avec Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
