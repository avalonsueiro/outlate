import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MockAuthProvider } from "@/context/MockAuthContext";

export const metadata: Metadata = {
  title: "Outlate - Split the night, not friendships",
  description: "Receipt splitting app for friend groups who go out together. Photograph receipts, itemize them, assign costs, and calculate who owes whom.",
  keywords: ["receipt splitting", "bill splitting", "friends", "going out", "expense sharing"],
  authors: [{ name: "Outlate" }],
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <MockAuthProvider>
          {children}
        </MockAuthProvider>
      </body>
    </html>
  );
}
