import { ConfigsConsumer, ConfigsProvider } from "./context/ConfigsContext";
import RTL from "./components/RTL";
import createCustomTheme from "./themes";
import ThemeProvider from "@mui/system/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { WalletContextProvider } from "@dailycodeltd/ermu";
import { HashRouter } from "react-router-dom";
import { chains } from "@web3modal/ethereum";
import React from "react";
import { appRoutes } from "./routes";
import renderRoutes from "./renderRoutes";

const Web3Modal = React.lazy(() =>
  import("./components/lazyHelpers/Web3Modal")
);

export function App() {
  return (
    <>
      <ConfigsProvider>
        <ConfigsConsumer>
          {({ configs }) => {
            return (
              <ThemeProvider
                theme={createCustomTheme({
                  direction: configs.direction,
                  responsiveFontSizes: configs.responsiveFontSizes,
                  themeMode: configs.themeMode,
                })}
              >
                <CssBaseline />
                <RTL direction={configs.direction}>
                  <WalletContextProvider
                    chainId={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
                  >
                    <HashRouter>
                      {renderRoutes({ routes: appRoutes })}
                    </HashRouter>
                  </WalletContextProvider>
                </RTL>
                <React.Suspense fallback={<div />}>
                  <Web3Modal
                    config={{
                      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                      network: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                      theme: configs.themeMode,
                      accentColor: "default",
                      ethereum: {
                        chains: [chains.goerli],
                        appName: "BlueAssetsGroup",
                        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                      },
                    }}
                  />
                </React.Suspense>
              </ThemeProvider>
            );
          }}
        </ConfigsConsumer>
      </ConfigsProvider>
    </>
  );
}
