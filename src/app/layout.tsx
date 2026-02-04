import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

// 1. Initialize Fonts
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora", // This creates a CSS variable
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velvet Bite",
  description:
    "Savor the velvet in every bite. Hand-crafted delights from master kitchens delivered to your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lora.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#C08552"
            showSpinner={true}
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            easing="ease"
            speed={200}
            shadow="0 0 10px #C08552,0 0 5px #C08552"
          />
          {children}

          <Toaster position="top-center" richColors expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
