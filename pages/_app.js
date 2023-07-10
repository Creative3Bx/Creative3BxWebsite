import React from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ContextProvider } from "../context";
import config from "@config/config.json";
import theme from "@config/theme.json";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import "../components/index.css";
import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/auth.css";
import { JsonContext } from "context/state";
import { useRouter } from 'next/router';

//import chatEngine components
import SupportEngine from "components/SupportEngine";
// Import Router for loading Icon
import Router from "next/router";
import Loader from "@layouts/components/Loader";

const App = ({ Component, pageProps }) => {
  // Get the current path.
  const router = useRouter();
  // default theme setup
  const { default_theme } = config.settings;

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Routing and loading Icon
  const [loading , setLoading] = useState(false)
  Router.events.on("routeChangeStart", (url)=>{
    setLoading(true);
  })
  Router.events.on("routeChangeComplete", (url)=>{
    setLoading(false);
  })
  return (
    <>
    <JsonContext>
    {loading && <Loader/>}
    <ContextProvider>
      
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme={default_theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      {router.pathname !== '/chats' && <SupportEngine />}
    </ContextProvider>
    </JsonContext>
    </>
  );
};

export default App;
