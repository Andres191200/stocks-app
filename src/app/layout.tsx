import type { Metadata } from "next";
import '@/app/globals.scss';
import Sidebar from "./shared/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Stock Viewer",
  description: "Stock viewer app in Next JS and SASS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="main-screen-container">
          {children}
        </div>
      </body>
    </html>
  );
}
