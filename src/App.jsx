import { ConfigsConsumer, ConfigsProvider } from "./context/ConfigsContext";
import RTL from "./components/RTL";
import createCustomTheme from "./themes";
import ThemeProvider from "@mui/system/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { WalletContextProvider } from "@dailycodeltd/ermu";
import { HashRouter } from "react-router-dom";
import { chains } from "@web3modal/ethereum";
import { appRoutes } from "./routes";
import renderRoutes from "./renderRoutes";
import { SnackbarProvider } from "notistack";
import { Web3Modal } from "@web3modal/react";
/*
const Web3Modal = React.lazy(() =>
  import("./components/lazyHelpers/Web3Modal")
);*/

export function App() {
  const getChain = () => {
    for (const net in chains) {
      if (chains[net].id === Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
        return chains[net];
      }
    }
  };

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
                <Web3Modal
                  config={{
                    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                    network: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                    theme: configs.themeMode,
                    accentColor: "default",
                    ethereum: {
                      chains: [getChain()],
                      appName: "ICO",
                      autoConnect: true,
                    },
                  }}
                />
                <CssBaseline />
                <SnackbarProvider
                  maxSnack={3}
                  autoHideDuration={1500}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <RTL direction={configs.direction}>
                    <WalletContextProvider
                      chainId={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
                    >
                      <HashRouter>
                        {renderRoutes({ routes: appRoutes })}
                      </HashRouter>
                    </WalletContextProvider>
                  </RTL>
                </SnackbarProvider>
              </ThemeProvider>
            );
          }}
        </ConfigsConsumer>
      </ConfigsProvider>
    </>
  );
}
