/**
 * @param providerOrSigner{import('ethers').providers.BaseProvider | import('ethers').providers.JsonRpcSigner}
 */
const extractChainId = (providerOrSigner) => {
  return providerOrSigner?._isSigner
    ? providerOrSigner?.provider?._network?.chainId
    : providerOrSigner?._network?.chainId;
};

export default extractChainId;
