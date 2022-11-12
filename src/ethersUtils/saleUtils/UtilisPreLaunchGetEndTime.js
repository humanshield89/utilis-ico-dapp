import abi from "../abis/ico-abi.json";
import { getContract } from "@dailycodeltd/ermu";

/**
 * @param address{}
 * @param provider
 * @returns {Promise<*>}
 */
const utilisPreLaunchGetEndTime = async (address, provider) => {
  const contract = getContract(address, provider, abi);
  return contract.endTime();
};

export default utilisPreLaunchGetEndTime;
