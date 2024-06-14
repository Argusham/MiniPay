// import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";

// export default function Home() {
//     const [userAddress, setUserAddress] = useState("");
//     const [isMounted, setIsMounted] = useState(false);
//     const { address, isConnected } = useAccount();

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     useEffect(() => {
//         if (isConnected && address) {
//             setUserAddress(address);
//         }
//     }, [address, isConnected]);

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <div className="flex flex-col justify-center items-center">
//             <div className="h1">
//                 There you go... a canvas for your next Celo project!
//             </div>
//             {isConnected ? (
//                 <div className="h2 text-center">
//                     Your address: {userAddress}
//                 </div>
//             ) : (
//                 <div>No Wallet Connected</div>
//             )}
//         </div>
//     );
// }


import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/context/useWeb3";
import { useEffect, useState } from "react";

export default function Home() {
    const {
        address,
        getUserAddress,
        sendCUSD,
    } = useWeb3();
    const [signingLoading, setSigningLoading] = useState(false);
  
    const [tx, setTx] = useState<any>(undefined);
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    useEffect(() => {
        getUserAddress().then(async () => {
           
         
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function sendingCUSD() {
        if (recipient && amount) {
            setSigningLoading(true);
            try {
                const tx = await sendCUSD(recipient, amount);
                console.log(tx);
                setTx(tx);
            } catch (error) {
                console.log(error);
            } finally {
                setSigningLoading(false);
            }
        }
    }

    


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h1">
               Welcome to X-wave Minipay
            </div>
            {address && (
                <>
                    <div className="h2 text-center">
                        Your addy:{" "}
                        <span className="font-bold text-sm">{address}</span>
                    </div>
                    {tx && (
                        <p className="font-bold mt-4">
                            Tx Completed:{" "}
                            {(tx.transactionHash as string).substring(0, 6)}
                            ...
                            {(tx.transactionHash as string).substring(
                                tx.transactionHash.length - 6,
                                tx.transactionHash.length
                            )}
                        </p>
                    )}
                    <div className="w-full px-3 mt-7">
                        <input
                            type="text"
                            placeholder="Recipient Address"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <PrimaryButton
                            loading={signingLoading}
                            onClick={sendingCUSD}
                            title={`Send ${amount || "cUSD"} to ${recipient || "address"}`}
                            widthFull
                        />
                    </div>


                </>
            )}
        </div>
    );
}
