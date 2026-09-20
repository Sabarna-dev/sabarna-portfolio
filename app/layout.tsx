import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sabarna.dev"),
  title: {
    default: "Sabarna Das | Developer portfolio",
    template: "%s | Sabarna Das",
  },
  description:
    "Portfolio of Sabarna Das, a developer building thoughtful web products and interactive experiments.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Sabarna Das | Developer portfolio",
    description:
      "Thoughtful web products, collaborative tools, and interactive experiments.",
    siteName: "Sabarna Das",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
