import { useContext } from "react";
import { ConfigsContext } from "../context/ConfigsContext";

const useConfigs = () => useContext(ConfigsContext);

export default useConfigs;
