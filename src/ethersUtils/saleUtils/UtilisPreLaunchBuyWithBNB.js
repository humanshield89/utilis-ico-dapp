import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{string} - contract address
 * @param signer{import('ethers').Signer} - signer
 * @param amount{BigNumber | String | BigInt} - amount
 * @returns {Promise<*>}
 */
const utilisPreLaunchBuyWithBNB = async (address, signer, amount) => {
  const contract = getContract(address, signer, abi);
  return contract.buyWithBNB({ value: amount });
};

export default utilisPreLaunchBuyWithBNB;
