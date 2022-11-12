import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{string}  - contract address
 * @param provider{ import('ethers').providers.BaseProvider } - ethers provider
 * @param userAddress{ string } - user address
 * @returns {Promise< ethers.BigNumber>} - amount of tokens bought by user
 */
const utilisPreLaunchgetUserBoughtAmount = async (
  address,
  provider,
  userAddress
) => {
  const contract = getContract(address, provider, abi);
  return contract.boughtAmount(userAddress);
};

export default utilisPreLaunchgetUserBoughtAmount;
