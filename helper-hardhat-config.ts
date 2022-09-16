export interface networkConfigItem {
  ethUsdPriceFeed?: string;
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one is ETH/USD contract
  goerli: {
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const SUPPLY = 70000000;
export const CAP = 100000000;
export const REWARD = 50;
