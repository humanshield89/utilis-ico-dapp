import abi from "../abis/pair-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{string}
 * @param provider{import('ethers').providers.BaseProvider}
 * @returns {Promise<{reserve0, reserve1, blockTimestampLast}>}
 */
const uniPairGetReserves = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  const res = await contract.getReserves();

  const {
    _reserve0: reserve0,
    _reserve1: reserve1,
    _blockTimestampLast: blockTimestampLast,
  } = res;

  return {
    reserve0,
    reserve1,
    blockTimestampLast,
  };
};

export default uniPairGetReserves;
