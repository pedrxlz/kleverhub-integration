import { useEffect, useState } from "react";
import ethIcon from "./assets/eth.png";
import klvIcon from "./assets/klv.png";
import trxIcon from "./assets/trx.png";
import { Select } from "./components/select";
import { Chain, HubAccount } from "./types";
import { formatAddress } from "./utils/format-address";

const chains = {
  [Chain.KLEVER]: {
    name: Chain.KLEVER,
    icon: klvIcon,
  },
  [Chain.ETHEREUM]: {
    name: Chain.ETHEREUM,
    icon: ethIcon,
  },
  [Chain.TRON]: {
    name: Chain.TRON,
    icon: trxIcon,
  },
};

function App() {
  const [account, setAccount] = useState<HubAccount | null>(null);
  const [currentChain, setCurrentChain] = useState(chains.KLV);

  async function connectWallet() {
    if (window && window.kleverHub) {
      try {
        await window.kleverHub.initialize(Chain.KLEVER);

        setAccount(window.kleverHub.account);
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      console.error("No wallet provider found");
    }
  }

  async function switchBlockchain(event: string) {
    await window.kleverHub.switchBlockchain(event);
  }

  const handleAccountChanged = (account: HubAccount) => {
    setAccount(account);
  };

  const handleBlockchainChanged = (chain: Chain) =>
    setCurrentChain(chains[chain]);

  useEffect(() => {
    if (!account) return;

    window.kleverHub.onAccountChanged(handleAccountChanged);
    window.kleverHub.onBlockchainChanged(handleBlockchainChanged);

    return () => {
      window.kleverHub.offAccountChanged(handleAccountChanged);
      window.kleverHub.offBlockchainChanged(handleBlockchainChanged);
    };
  }, [account]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 p-6 border border-gray-300 rounded-md bg-white shadow-lg">
        {!!account && (
          <Select
            options={Object.values(chains)}
            selectedOption={currentChain}
            onSelect={switchBlockchain}
          />
        )}

        {!!account && (
          <div className="mt-4">
            <h1 className="text-lg font-semibold mb-2">
              Connected Address: {formatAddress(account?.address)}
            </h1>
            <p className="text-sm text-gray-500">{account?.name}</p>
          </div>
        )}

        {!account && (
          <button
            className="w-full h-10 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
