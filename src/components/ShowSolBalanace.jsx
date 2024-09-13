import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect } from 'react'
import Airdrop from './Airdrop';

function ShowSolBalanace() {
    const {connection} = useConnection(); // find connection with blockChain
    const wallet = useWallet(); // provide information of connected wallet , such as public key

    async function getBalance() {
        if(wallet.publicKey){
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
        }
        // console.log(airdropped)
    }
    useEffect(()=>{
        getBalance();
    },[wallet.publicKey]);
    getBalance();
    return <div>
        <p>SOL Balance:</p> <div id="balance"></div>
    </div>
}

export default ShowSolBalanace