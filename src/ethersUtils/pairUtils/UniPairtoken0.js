import abi from "../abis/pair-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 *
 * @param address{string}
 * @param provider{import('ethers').providers.BaseProvider}
 * @returns {Promise<string>}
 */
const uniPairToken0 = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  return contract.token0();
};

export default uniPairToken0;
