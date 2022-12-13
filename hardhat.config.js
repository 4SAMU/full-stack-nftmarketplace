/**
 * /* hardhat.config.js
 *
 * @format
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const { API_KEY, Alchemy_provider } = process.env;

module.exports = {
  defaultNetwork: "optism_goerli",
  networks: {
    optism_goerli: {
      url: Alchemy_provider,
      accounts: [process.env.PrivateKey],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.6.3",
      },
      {
        version: "0.8.17",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
   
    apiKey: API_KEY,
  },
};
