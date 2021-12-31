
import * as web3 from '@solana/web3.js';
import {
    initNativeTransaction,
} from "zebecprotocol-sdk";
import { variables } from './variables';

export const wrappedLocalStorage = (key: string, value?: string) => {
    return {
        set: () => {
            if (!value) {
                alert("Value is not set " + key)
            }
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            return localStorage.setItem(key, value)
        }
        ,
        get: (parse: boolean = false) => {
            const item = localStorage.getItem(key);
            return parse ? JSON.parse(item as string) : item;
        }
    }
}

export const getPublicKey = async () => {
    await getProvider();
    const resp = await (window as any).solana.connect();
    const publicKey = resp.publicKey.toString();
    wrappedLocalStorage('PUBLIC_KEY', publicKey).set();
}


export const getProvider = async () => {
    if ("solana" in window) {
        const provider = (window as any).solana;
        provider.connect();
        if (provider.isPhantom) {
            return provider;
        }
    }
console.log({a: (window as any).isPhantom});
    //window.open("https://phantom.app/", "_blank");
}

export async function transferSOL(amount: number) {
    const provider = (window as any).solana
    if (!provider.publicKey) {
        getPublicKey();
    }

    const connection = new web3.Connection(
        web3.clusterApiUrl('devnet', true),
    );
    const recieverWallet = new web3.PublicKey(variables.shakersKey);
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: recieverWallet,
            lamports: amount * 1000000000
        }),
    );

    transaction.feePayer = provider.publicKey;

    console.log({ from: provider.publicKey.toString(), to: variables.shakersKey })
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    if (transaction) {
        console.log("Txn created successfully");
    }

    const signed = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);
    console.log("Signature: ", signature);

    return true;
}


export const createWinnerStream = async (value: any) => {
    const provider = (window as any).solana
    if (!provider.publicKey) {
        await getPublicKey();
    }
    const recieverKey = provider.publicKey.toString();
    const presentTimeUnixTime = Date.now();
    const oneMinuteTime = presentTimeUnixTime + 60 * 1000;
    const data = {
        sender: variables.shakersKey,
        receiver: recieverKey,
        amount: value,
        start: Date.now(),
        end: oneMinuteTime,
    };
    console.log({ data });
    const response = await initNativeTransaction(data);
    console.log({ response });
}



