import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react'

function Airdrop() {
    const wallet = useWallet(); // provide wallet info including public key
    const {connection} = useConnection(); // represent to solana block chain
    const [amt, setAmt] = useState(0);
    async function requestAirdrop() {
        let amount = amt;
        console.log(wallet)
        if(!wallet.publicKey){
            alert("connect wallet first")
        }
        try {
            console.log(connection)
            const balanceBefore = await connection.getBalance(wallet.publicKey);
            console.log(balanceBefore);
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            // setAirdropped(prev => prev + 1); // Update state after confirmation
            alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
            const balanceAfter = await connection.getBalance(wallet.publicKey);
            console.log(balanceAfter);
        } catch (error) {
            console.error('Airdrop failed', error);
            alert('Failed to request airdrop');
        }
    }

  return (
    <div>
        <br />
        <input type="number" placeholder='Amount' value={amt} onChange={(data)=> setAmt(data.target.value)}/>
        <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
  )
}

export default Airdrop
