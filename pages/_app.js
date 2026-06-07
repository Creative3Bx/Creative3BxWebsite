import React from "react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ContextProvider } from "../context";
import config from "@config/config.json";
import theme from "@config/theme.json";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import { JsonContext } from "context/state";

//import chatEngine components
import SupportEngine from "components/SupportEngine";
// Import Router for loading Icon
import Router from "next/router";
import Loader from "@layouts/components/Loader";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
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
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  return (
    <>
      {/* Google Tag Manager - Global site tag */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
          `,
        }}
      />
      <JsonContext>
        <Script id="chatwoot-settings" strategy="afterInteractive">
          {`
          window.chatwootSettings = {
            hideMessageBubble: true,
            position: 'right',
            type: 'standard',
          };
          (function(d,t) {
            var BASE_URL="https://app.chatwoot.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: "${process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE}",
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `}
        </Script>
        {loading && <Loader />}
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Creative3Bx IT Services",
                url: "https://creative3bx.com",
                logo: "https://creative3bx.com/images/Logo-Creative3BxDark.svg",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+61 494 743 131",
                  contactType: "customer service",
                  email: "Admin@Creative3bx.com",
                },
              }),
            }}
          />
        </Head>
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
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Component {...pageProps} />
          </ThemeProvider>
          <SupportEngine />
        </ContextProvider>
      </JsonContext>
    </>
  );
};

export default App;
