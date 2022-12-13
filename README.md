<!-- @format -->

# Building a Museum selling nfts marketplace for artfact on goerli-optism, Next.js, Tailwind, Solidity, Hardhat, Ethers.js, and IPFS

from a metaverse site, the user can com eto this site and access each particular nft for purchasing

# Prerequisites

-Node.js version 16.14.0 or greater installed on your machine. I recommend installing Node using either nvm or fnm.
-Metamask wallet extension installed as a browser extension

# The Stack

Web application framework - [Next.js](https://nextjs.org/) <br />
Solidity development environment - [Hardhat](https://hardhat.org/) <br />
File Storage - [IPFS](https://nft.storage/) <br />
Ethereum Web Client Library -[ Ethers.js](https://docs.ethers.io/v5/) <br />

# Setting up Tailwind CSS

```shell
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p

npm run dev

```

# in tailwind.config.js:

```js
/* tailwind.config.js */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

# Finally, delete the code in styles/globals.css and update it with the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# hardhat.config.js

```js
/* hardhat.config.js */
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

```

#example of a verified contract

click here to confirm [Verified contract](https://goerli-optimism.etherscan.io/address/0xA59aed175E79FCb33e8d868290F39e09B39670dF#code)







