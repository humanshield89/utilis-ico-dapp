import abi from "../abis/router-api.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 *
 * @param address{string} - The address of the router
 * @param provider{import('ethers').providers.BaseProvider} - ethers provider
 * @param amountIn{string | number | import('ethers').BigNumber | BigInt} - amount of token to be swapped
 * @param path{string[]} - array of token addresses
 * @returns {Promise<[import('ethers').BigNumber]>}
 */
const uniGetAmountOut = async (address, provider, amountIn, path) => {
  const contract = getContract(address, provider, abi);
  return contract.getAmountsOut(amountIn, path);
};

export default uniGetAmountOut;
