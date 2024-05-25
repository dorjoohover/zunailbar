import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the Google Fonts import */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,300&family=Roboto+Slab:wght@600&family=Roboto:ital@0;1&display=swap"
        />
        <link
          rel="icon"
          // href=""
          // className="rounded-full"
          href="http://localhost:3000/img/zunailbar_logo.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
