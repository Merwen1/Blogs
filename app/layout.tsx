import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";
import { EdgeStoreProvider } from "../helpers/edgestore";

export const metadata: Metadata = {
  title: "Blogs App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const hasToken = cookieStore.has("token");

  return (
    <html lang="en">
      <body>
        <EdgeStoreProvider>
          <Nav isLoggedIn={hasToken} />
          <Toaster position="top-center" />
          <Suspense fallback={<Loading />} />
          {children}
          <Footer />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
