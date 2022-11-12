import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{String} - address of the sale contract
 * @param provider{import('ethers').providers.BaseProvider} - ethers provider
 * @returns {Promise<import('ethers').BigNumber>}
 */
const utilisPreLaunchGetMaxBuy = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  return contract.maxBuy();
};

export default utilisPreLaunchGetMaxBuy;
