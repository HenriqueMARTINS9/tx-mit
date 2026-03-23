import type { Metadata } from "next";
import "video.js/dist/video-js.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TX-MIT | Architecture vidéo",
  description:
    "Chez TX-MIT, nous comparons iframe, SDK et lecture native mobile pour recommander l'architecture vidéo adaptée."
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
