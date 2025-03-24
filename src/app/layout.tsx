import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-DMSans",
});

export const metadata: Metadata = {
  title: "Solution Challegnge 2025",
  description: "Solution Challegnge 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable}  antialiased `}
      >
       {children}
      </body>
    </html>
  );
}
