import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const Trench = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AIparasytes_",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Trench.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
