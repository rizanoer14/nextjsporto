"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import "./nprogress.css";
import { Analytics } from "@vercel/analytics/react";
import Chat from "@/components/Chat";

const TopProgressBar = dynamic(() => import("@/components/TopProgressbar"), {
  ssr: false,
});

export const metadata = {
  // metadata remains the same
};

export default function RootLayout({ children }) {
  const pathname = usePathname();  // Dapatkan pathname saat ini
  
  const isAdminRoute = pathname.startsWith("/admin");  // Cek apakah route adalah bagian dari /admin

  return (
    <html lang="en">
      <body>
        <TopProgressBar />
        {/* Render Navbar hanya jika bukan di route /admin */}
        {!isAdminRoute && <Navbar />}
        {children}
        <Chat />
        <Analytics />
      </body>
    </html>
  );
}