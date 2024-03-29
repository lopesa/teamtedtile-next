import "../styles/globals.scss";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://teamtedtile.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></Script>
        <Script id="ga-setup">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', "${GA_MEASUREMENT_ID}");
          `}
        </Script>
      </head>
      <body>
        <link rel="stylesheet" href="https://use.typekit.net/vac1ugo.css" />
        {children}
      </body>
    </html>
  );
}
