import withTwindApp from "@twind/next/shim/app";
import { QueryClient, QueryClientProvider } from "react-query";
import twindConfig from "../twind.config";

const client = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default withTwindApp(twindConfig, App);
