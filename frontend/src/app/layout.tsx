import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Bricolage_Grotesque } from "next/font/google";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/common/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Boub'Chic",
  description: "Plateforme de vente en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="fr">
      <link rel="icon" href="/logo/favicon.png" type="image/png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <div className="mx-auto flex min-h-screen max-w-[900px] flex-col bg-white font-inter text-sm">
          <QueryProvider>
            <Header/>
            {children}
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
