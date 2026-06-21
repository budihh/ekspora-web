import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ui/ChatWidget";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Ekspora — Indonesian Premium Export Commodities",
  description: "Mitra ekspor terpercaya untuk komoditas unggulan Indonesia. Rempah, kopi, kelapa, dan lebih banyak lagi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        <ChatWidget />
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
