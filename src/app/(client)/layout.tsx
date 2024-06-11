import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getIsAdmin } from "../actions";

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const isAdmin = await getIsAdmin();

  return (
    <div className="overflow-hidden min-h-screen h-full relative">
      <NextIntlClientProvider messages={messages}>
        <Header isAdmin={isAdmin} />
        <Providers>{children}</Providers>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
