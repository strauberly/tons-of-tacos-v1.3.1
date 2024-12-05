import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const quatl = localFont({
  src: "./Quatl-3zp26.ttf",
  display: "swap",
  variable: "--quatl",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter-font",
});
