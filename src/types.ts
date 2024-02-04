export interface HubAccount {
  address: string;
  chain: Chain;
  name: string;
}

export enum Chain {
  KLEVER = "KLV",
  ETHEREUM = "ETH",
  TRON = "TRX",
}
