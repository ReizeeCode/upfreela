import React from 'react';
import Head from 'next/head';
import { Provider } from "next-auth/client"
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastyProvider } from '../src/contexts/Toasty';
import CheckAuth from '../src/components/CheckAuth'
import theme from '../src/theme';


export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* session é a sessão do usuário, é criada automaticamente pelo next quando o user abre a pagina e passa para o Provider do próprio next-auth*/}
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            <CssBaseline />
            {
              Component.requireAuth
                ? <CheckAuth Component={Component} pageProps={pageProps}/> // true
                : <Component {...pageProps} /> // false
            }
          </ToastyProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}