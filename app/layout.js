import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL('https://enterprise.riebelle.com'),
  title: "ShopKite Enterprise | Administrative Portal",
  description: "Enterprise multi-store accounting, product catalog SKUs, payroll, and financial operations suite.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ShopKite Enterprise | Administrative Portal",
    description: "Enterprise multi-store accounting, product catalog SKUs, payroll, and financial operations suite.",
    url: "https://enterprise.riebelle.com",
    siteName: "ShopKite Enterprise",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "ShopKite Enterprise",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ShopKite Enterprise | Administrative Portal",
    description: "Enterprise multi-store accounting, product catalog SKUs, payroll, and financial operations suite.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
