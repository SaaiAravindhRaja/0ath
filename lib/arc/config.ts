export function getArcConfig() {
  return {
    rpcUrl: process.env.ARC_TESTNET_RPC_URL ?? "https://rpc.testnet.arc.network",
    privateKey: process.env.ARC_TESTNET_PRIVATE_KEY,
    contractAddress: process.env.ARC_RECEIPT_CONTRACT_ADDRESS,
    chainId: 5042002,
    explorerBase: "https://testnet.arcscan.app"
  };
}
