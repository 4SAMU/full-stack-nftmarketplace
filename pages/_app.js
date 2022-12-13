/**
 * /* pages/_app.js
 *
 * @format
 */

import "../styles/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [currAddress, updateCurrAddress] = useState();
  const [chainId, setChainId] = useState();
  const [provider, setProvider] = useState();

  const walletConnet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateCurrAddress(
      String(
        accounts[0].substring(0, 5) + "..." + String(accounts[0].substring(38))
      )
    );
  };

  const numberToHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
  const handleChange = async (chainId, url) => {
    setChainId(chainId);
    setProvider(url);

    if (window.ethereum.networkVersion !== chainId) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: numberToHex(chainId) }],
      });
    }
    // alert(url);
  };

  useEffect(() => {
    walletConnet();
  }, []);

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl text-pink-500 font-bold">Art Museum</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">Home</a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-pink-500">Mint an art</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">My Arts</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">Dashboard</a>
          </Link>
          <div>
            {currAddress ? (
              <button className="mr-6 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded">
                connected to : {currAddress}
              </button>
            ) : (
              <button
                className="mr-6 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded place-items-end"
                onClick={walletConnet}
              >
                connect Wallet
              </button>
            )}
          </div>
          <select
            className="ml-10  bg-pink-500 text-white font-bold py-2 px-12 rounded"
            onChange={(e) => handleChange(e.target.value)}
            value={chainId}
            id={provider}
          >
            <option>Select Network</option>
            <option value="420">Optimism Goerli</option>
          </select>
          <a
            href="https://goerli-optimism.etherscan.io/address/0xA59aed175E79FCb33e8d868290F39e09B39670dF#code"
            target="_blank"
            rel="noreferrer"
            className="ml-10  bg-pink-500 text-white font-bold py-2 px-12 rounded"
          >
            Verified Contract
          </a>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
