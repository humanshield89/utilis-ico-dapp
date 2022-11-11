import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialConfigs = {
  direction: "ltr",
  responsiveFontSizes: true,
  themeMode: "dark",
};

const restoreConfigs = () => {
  let configs = null;

  try {
    const storedData = window.localStorage.getItem("configs");
    if (storedData) {
      configs = JSON.parse(storedData);
    } else {
      configs = initialConfigs;
      storeConfigs(configs);
    }
  } catch (err) {
    console.error(err);
  }

  return configs;
};

const storeConfigs = (configs) => {
  window.localStorage.setItem("configs", JSON.stringify(configs));
};

export const ConfigsContext = createContext({
  configs: initialConfigs,
  isLoaded: false,
  saveConfigs: () => {},
});

export const ConfigsProvider = (props) => {
  const { children } = props;

  const [configs, setConfigs] = useState({ ...initialConfigs });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restoredConfigs = restoreConfigs();
    if (restoredConfigs) {
      setConfigs(restoredConfigs);
      setIsLoaded(isLoaded);
    }
  }, []);

  const saveConfigs = (updatedConfigs) => {
    if (!configs) return;
    setConfigs((old) => {
      const newConfigs = { ...old, ...updatedConfigs };
      storeConfigs(newConfigs);
      return newConfigs;
    });
  };

  return (
    <ConfigsContext.Provider
      value={{
        configs,
        isLoaded,
        saveConfigs,
      }}
    >
      {children}
    </ConfigsContext.Provider>
  );
};

ConfigsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ConfigsConsumer = ConfigsContext.Consumer;
