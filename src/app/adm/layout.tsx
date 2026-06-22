import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
