import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "String Theory - Random Music Scale Generator",
  description: "Generate random music scales for practice and music theory study. Perfect for musicians, students, and anyone interested in learning scales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
