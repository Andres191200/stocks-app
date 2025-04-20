'use client'
import type { Metadata } from "next";
import "@/app/globals.scss";
import Sidebar from "./shared/components/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Stocks Viewer</title>
      <meta name="Stock viewer" content="Stock viewer app using Next JS / Tanstack Query / Zustand" />
      <QueryClientProvider client={queryClient}>
        <body>
          <Sidebar />
          <div className="main-screen-container">{children}</div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
