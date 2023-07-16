import { AnimatePresence } from "framer-motion";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="stylesheet" href="https://use.typekit.net/vac1ugo.css" />
        </Head>
        <body>
          {/* <AnimatePresence mode="wait" initial={false}> */}
          <Main />
          {/* </AnimatePresence> */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
