import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = { title: "Clínica", description: "Agenda médica" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50">
        <Navbar />
        <main className="container-page py-6">{children}</main>
      </body>
    </html>
  );
}
