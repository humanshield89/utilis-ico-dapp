import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 *
 * @param address{string}   - contract address
 * @param provider {import('ethers').providers.BaseProvider} - ethers provider
 * @returns {Promise<import('ethers').BigNumber>}
 */
const utilisPreLaunchGetTotalSold = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  return contract.totalSold();
};

export default utilisPreLaunchGetTotalSold;
