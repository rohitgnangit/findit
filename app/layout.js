import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import ToastProvider from "@/components/ToastProvider";
import Loader from "@/components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FindiT",
  description: "A site you can find your things that you lost somewhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="overflow-x-hidden absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      >
        <SessionWrapper>
          <ToastProvider>
            <Navbar />
            <div className="font-sans min-h-[83.5vh] mt-15">
            <Loader/>
              {children}
            </div>
            <Footer />
          </ToastProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
