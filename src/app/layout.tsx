import React, { ReactNode } from "react";
import "../styles/globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        {/* <title>Academia de Combate</title> */}
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
