import { useEffect } from "react";
import "./App.css";
import {
  useWeb3ModalAccount,
  createWeb3Modal,
  defaultConfig,
} from "@web3modal/ethers/react";
const projectId = "57c3ed3f7633af987eda789d503edfee";
const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    currency: "ETH",
    explorerUrl: "https://arbiscan.io",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  {
    chainId: 97,
    name: "BSC Testnet",
    currency: "BNB",
    explorerUrl: "https://explorer.binance.org/smart-testnet",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
];

const ethersConfig = defaultConfig({
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal Laboratory",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  defaultChainId: 1,
  rpcUrl: "https://cloudflare-eth.com",
});
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
  themeMode: "dark",
});

function App({ setAddress }) {
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    setAddress(address);
  }, [address]);
  return (
    <div className="d-flex justify-content-center p-3">
      <w3m-network-button />
      <div className="ms-3">
        <w3m-button className="custom-w3m-button" />
      </div>
    </div>
  );
}

export default App;
