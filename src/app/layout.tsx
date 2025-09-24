import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

// const workSans = localFont({
//   src: [
//     {
//       path: "./fonts/WorkSans-Thin.ttf",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "./fonts/WorkSans-ExtaBold.ttf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "./fonts/WorkSans-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path : "./fonts/WorkSans-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/WorkSans-Medium.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/WorkSans-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/WorkSans-Light.ttf",
//       weight: "300",
//       style: "normal",
//     },
//   ],
//   variable: "--font-work-sans",
// })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch your startup to top investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
