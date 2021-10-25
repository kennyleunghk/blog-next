import { FC } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.css";
import Layout from "../components/layout";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
