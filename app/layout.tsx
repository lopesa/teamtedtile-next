"use client";

import { useRef } from "react";
import "../styles/globals.scss";
import Menu from "components/menu";
import HomeSplash from "@components/homeSplash";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vac1ugo.css" />
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
        <Menu triggerElementRef={menuTriggerRef} position="fixed" />
        <HomeSplash />
        <div ref={menuTriggerRef} />
        {children}
      </body>
    </html>
  );
}
