import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import CartContextProvider from "./_context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "Digital Courses",
  description: "Digital Courses",
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* <Analytics /> */}
      {/* <SpeedInsights /> */}
      <ClerkProvider>
        <CartContextProvider>
          <html lang="en" className="dark">
            <body
              className={`${inter.className} dark:bg-gray-900 dark:text-white`}
            >
              <div className="min-h-[calc(100vh-99px-80px)]">
                <Header />
                {children}
              </div>
              <Footer />
            </body>
          </html>
        </CartContextProvider>
      </ClerkProvider>
    </>
  );
}
