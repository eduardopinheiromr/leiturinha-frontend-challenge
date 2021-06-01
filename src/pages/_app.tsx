import { AppProps } from "next/app";
import { ProductsStore, StoreProvider } from "../stores";
import "../styles/globals.css";

const store = new ProductsStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
