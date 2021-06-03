import { AppProps } from "next/app";
import { ProductsStore, StoreProvider } from "../stores";
import "tailwindcss/tailwind.css";
import Toast from "src/components/Toast";

const store = new ProductsStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
      <Toast />
    </StoreProvider>
  );
}

export default MyApp;
