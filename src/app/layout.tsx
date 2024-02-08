import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn, constructMetadata } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ThemeToogle from "@/components/theme-toggle";
import Navbar from "@/components/navbar/navbar";
import TrpcProviders from "@/components/providers/trpc-providers";
import Footer from "@/components/footer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="relative flex min-h-screen flex-col">
            <TrpcProviders>
              <Navbar />
              <ThemeToogle className="fixed bottom-10 right-10 shadow-2xl" />
              <div className="flex-1 flex-grow">{children}</div>
              <Footer />
            </TrpcProviders>
          </main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
