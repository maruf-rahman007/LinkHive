import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import RecoilContextProvider from "./lib/RecoilContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LinkHive: All Your Digital Spaces in One Place, Simplified.",
  description:
    "LinkHive is the ultimate tool to organize and share all your online profiles, projects, and content in one convenient link. Whether you're a creator, business owner, or influencer, LinkHive helps you consolidate everything that defines you into a single, easy-to-share hub. With a customizable interface and seamless integration across platforms, LinkHive makes it effortless for your audience to connect with your world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add your favicon here */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <RecoilContextProvider>
          {children}
          </RecoilContextProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
