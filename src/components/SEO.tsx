import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        href="/android-chrome-256x256.png"
        sizes="256x256"
      />
      <link
        rel="icon"
        type="image/png"
        href="/android-chrome-192x192.png"
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="twitter:image" content="/og-image.jpg" />
      <meta name="theme-color" content="#009191" />
    </Head>
  );
}
