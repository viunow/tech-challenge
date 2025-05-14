import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "@/components/ThemeProvider";
import { TaskProvider } from "@/contexts/TaskContext";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    title: "Gerenciador de Tarefas",
    description:
      "Gerenciador de Tarefas feito para o desafio técnico da Lidere",
    metadataBase: new URL("https://gerenciador-de-tarefas-teal.vercel.app"),
    openGraph: {
      title: "Gerenciador de Tarefas",
      description:
        "Gerenciador de Tarefas feito para o desafio técnico da Lidere.",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Gerenciador de Tarefas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gerenciador de Tarefas",
      description:
        "Gerenciador de Tarefas feito para o desafio técnico da Lidere",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased min-h-svh flex flex-col justify-between bg-neutral-50`}
      >
        <ClientThemeProvider>
          <TaskProvider>
            <div>
              <Nav />
              {children}
            </div>
            <Footer />
          </TaskProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
