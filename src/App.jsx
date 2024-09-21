import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import ShowSolBalanace from "./components/ShowSolBalanace";
import SendToken from "./components/SendToken";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  console.log(network);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]); // value, [dependency]
  // const alchemyNetwork =
  //   "https://solana-devnet.g.alchemy.com/v2/Vnv1DmggunfEhWCjzc1iPMdzegDHEOD2";
  // const [airdropped, setAirdropped] = useState(0);
  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {/* wallet provider provide wallet related context */}
          <WalletModalProvider>
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              className='connect'
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div className='center'>
              <ShowSolBalanace />
            </div>
            <Airdrop />
            {/* <SendToken/> */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
