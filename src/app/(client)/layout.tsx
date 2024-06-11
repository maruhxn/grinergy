import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <div className="overflow-hidden min-h-screen h-full relative">
      <NextIntlClientProvider messages={messages}>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
