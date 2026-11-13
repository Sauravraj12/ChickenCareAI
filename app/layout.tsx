import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChickenCare AI — Happy Chickens, Healthier Lives",
  description: "A human-and-animal wellbeing companion for chicken-assisted care."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
