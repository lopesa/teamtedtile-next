import "../styles/globals.scss";
import Menu from "components/menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vac1ugo.css" />
      </head>
      <body>
        <Menu menuScrolledPast={false} />
        {children}
      </body>
    </html>
  );
}
