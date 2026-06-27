import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

// Load Premium Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Configure SEO Metadata
export const metadata: Metadata = {
  title: "VLP SWAN | Premium Thermocol & EPS Solutions",
  description:
    "VLP SWAN (Venkateswara Lovaprasad Exports) - Leading manufacturer and global exporter of high-quality Expanded Polystyrene (EPS) thermocol boxes, sheets, and loose fill round beans for custom packaging, insulation, and industrial molding.",
  keywords: [
    "VLP SWAN",
    "Venkateswara Lovaprasad Exports",
    "Thermocol Box manufacturer",
    "EPS sheets supplier",
    "Styrofoam round beans",
    "Expanded Polystyrene insulation",
    "Custom molded thermocol",
    "EPS packaging India",
  ],
  authors: [{ name: "VLP SWAN" }],
  openGraph: {
    title: "VLP SWAN | Premium Thermocol & EPS Solutions",
    description:
      "VLP SWAN (Venkateswara Lovaprasad Exports) - Leading manufacturer of premium Expanded Polystyrene (EPS) thermocol boxes, sheets, and loose fill beans.",
    type: "website",
    locale: "en_US",
    siteName: "VLP SWAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLP SWAN | Premium Thermocol Solutions",
    description:
      "Leading global exporter of high-quality Expanded Polystyrene (EPS) thermocol products.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0052cc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, outfit.variable)}>
      <body className="font-sans text-foreground antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
