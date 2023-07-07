"use client";

import { useRef } from "react";
import "../styles/globals.scss";
import Menu from "components/menu";
import HomeSplash from "@components/homeSplash";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vac1ugo.css" />
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
