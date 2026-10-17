import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMS | Education Management",
  description:
    "An education management platform for coaching centers, training institutes, schools, and universities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
