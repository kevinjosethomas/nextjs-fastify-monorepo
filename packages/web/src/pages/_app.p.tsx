import type { AppProps } from "next/app";

import "ui/styles/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
