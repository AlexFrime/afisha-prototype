import type { Metadata } from "next";
import { displayFont, bodyFont } from "./fonts";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Мастер и Маргарита — Classic Afisha",
  description: "Музыкальный спектакль с иммерсивными декорациями",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
