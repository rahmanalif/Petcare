import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../component/global/Navbar";
import Footer from "../component/global/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baksoSapi = localFont({
  src: "../public/fonts/BaksoSapi.otf",
  variable: "--font-bakso-sapi",
});

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/static/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Wuffoos - Pet Care Services",
  description: "Book your next pet care service in seconds with AI assistance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baksoSapi.variable} ${montserrat.variable} antialiased`}
      >
        <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
