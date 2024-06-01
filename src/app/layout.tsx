import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import SEO from "@/components/SEO";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import localFont from "next/font/local";
import "./globals.css";

const krFont = localFont({
  src: [
    {
      path: "../../public/fonts/NotoSansKR-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/NotoSansKR-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/NotoSansKR-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-kr",
});

const enFont = localFont({
  src: [
    {
      path: "../../public/fonts/UniversLTPro-Condensed.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/UniversLTPro-BoldCond.otf",
      weight: "700",
    },
  ],
  variable: "--font-en",
});

const DESCRIPTION =
  "Environment, Innovation, Energy and Grinergy for the Green Future";

export const metadata: Metadata = {
  title: `GRINERGY`,
  description: DESCRIPTION,
  keywords: ["grinergy"],
  twitter: {
    title: "GRINERGY",
    card: DESCRIPTION,
  } as Twitter,
  openGraph: {
    siteName: "GRINERGY",
    locale: "ko_KR",
    title: "GRINERGY",
    description: DESCRIPTION,
    type: "website",
    url: "https://www.grinergy.tech",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <SEO />
      <body
        className={`
          ${krFont.variable}
          ${enFont.variable}
          ${locale === "en" ? "font-en" : "font-kr"} 
          text-black leading-[1.2] bg-white
        `}
      >
        <div className="overflow-hidden min-h-screen h-full relative">
          <NextIntlClientProvider messages={messages}>
            <Header />
            <Providers>{children}</Providers>
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
