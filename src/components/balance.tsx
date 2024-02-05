import { useCallback, useEffect, useState } from "react";
import { Chain, HubAccount } from "../types";

interface BalanceProps {
  account: HubAccount;
}

const Balance = ({ account }: BalanceProps) => {
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = useCallback(async () => {
    let balance;

    try {
      switch (account.chain) {
        case Chain.KLEVER:
          balance = await window.kleverWeb.getBalance();
          balance = balance / 10 ** 6;
          break;
        case Chain.ETHEREUM:
          balance = await window.ethereum.getBalance();
          balance = balance / 10 ** 18;
          break;
        case Chain.TRON:
          balance = await window.tronWeb.trx.getBalance(account.address);
          balance = balance / 10 ** 6;
          break;
        default:
          balance = 0;
          break;
      }

      setBalance(balance);
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  }, [account.address, account.chain]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  if (balance === null) return;

  return (
    <div>
      <h2 className="text-base font-medium mb-2">
        Balance: {balance} {account.chain}
      </h2>
    </div>
  );
};

export default Balance;
