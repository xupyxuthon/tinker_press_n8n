import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/contexts/ChatContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AuthProvider } from "@/contexts/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Candy AI - Your AI Companions",
  description: "Chat with AI characters powered by advanced language models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-sage-gold/30`}
        suppressHydrationWarning
      >
        <SidebarProvider>
          <LanguageProvider>
            <AuthProvider>
              <ChatProvider>
                <div suppressHydrationWarning className="contents">
                  {children}
                </div>
              </ChatProvider>
            </AuthProvider>
          </LanguageProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
