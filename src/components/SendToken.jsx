import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";


export default function SendToken() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amt,setAmt] = useState(0);
    async function sendTokens() {
        let to = document.getElementById("to").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amt * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amt + " SOL to " + to);
    }

    return <div>
        <input id="to" type="text" placeholder="To" />
        <input value={amt} onChange={(e)=> setAmt(e.target.value)} type="text" placeholder="Amount" />
        <button onClick={sendTokens}>Send</button>
    </div>
}