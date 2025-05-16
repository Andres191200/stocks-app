'use client'
import type { Metadata } from "next";
import "@/app/globals.scss";
import Sidebar from "./shared/components/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "zustand";
import { useStocksStore } from "./home/store/store";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {theme} = useStocksStore();

  return (
    <html lang="en">
      <title>Stocks Viewer</title>
      <meta name="Stock viewer" content="Stock viewer app using Next JS / Tanstack Query / Zustand" />
      <QueryClientProvider client={queryClient}>
        <body className={`${theme}-theme`}>
          <Sidebar />
          <div className="main-screen-container">{children}</div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
