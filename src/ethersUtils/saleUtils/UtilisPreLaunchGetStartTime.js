import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{string}
 * @param provider{import('ethers').providers.BaseProvider}
 * @returns {Promise<*>}
 */
const utilisPreLaunchGetStartTime = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  return contract.startTime();
};

export default utilisPreLaunchGetStartTime;
