import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import { ThemeProvider } from "@/hooks/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const wdxlLubrifont = localFont({
  src: [
    {
      path: "../public/fonts/WDXLLubrifontTC-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wdxl-lubrifont",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lena",
  description: "A simple, beautiful, and fast AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${wdxlLubrifont.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider defaultTheme="dark">
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <main className="w-full min-h-screen">
              <SidebarTrigger className="lg:hidden fixed top-4 left-4 z-40 border border-gray-300 rounded-md p-4 text-xl" />
                <Provider>{children}</Provider>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
