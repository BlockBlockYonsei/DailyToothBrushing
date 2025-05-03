import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Transaction } from "@mysten/sui/transactions";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [digest, setDigest] = useState("");

  const account = useCurrentAccount();
  const wallets = useWallets();
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  useEffect(() => {
    console.log("digest", digest);
  }, [digest]);

  return (
    <>
      <div>
        <nav>
          {account ? (
            <div className="flex flex-col items-center">
              <p className="text-center text-lg font-bold">{account.label}</p>
              <Button
                className="w-45 bg-black text-white hover:bg-white hover:bg-blue-200"
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="mx-auto w-5/6">
              <Button
                className="w-45 border-2 border-black bg-white text-black hover:bg-blue-200"
                onClick={() => connect({ wallet: wallets[0] })}
              >
                Connect wallet
              </Button>
            </div>
          )}
        </nav>
        <div>Daily Tooth Brushing</div>
        {/* <div className="flex border-2 border-black"> */}
        {account && (
          <div className="flex min-h-45 w-full border-2 border-black items-center justify-around">
            <div className="relative">
              <img
                className="h-45 w-45 z-10"
                src="data:image/png;base64,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"
              />
              <div className="absolute top-10 -right-40 border-2 w-[500px] border-black p-10 flex justify-between items-center  ">
                <Button
                  className="bg-white hover:bg-amber-200 active:bg-amber-300 w-45 border-2 border-black cursor-pointer"
                  onClick={() => {
                    const tx = new Transaction();
                    const PACKAGE_ID =
                      "0x7b37825a072e4423acd5c4ae88464b123960385f1eed0191a646155f4010d4b7";

                    tx.moveCall({
                      target: `${PACKAGE_ID}::contract::brush_my_teeth`,
                      typeArguments: [],
                      arguments: [
                        // tx.object(
                        //   "0x0000000000000000000000000000000000000000000000000000000000000006"
                        // ),
                      ],
                    });
                    signAndExecuteTransaction(
                      {
                        transaction: tx,
                        chain: "sui:testnet",
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest(result.digest);
                        },
                        onError: (error) => {
                          console.log("Error", error);
                        },
                      }
                    );
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="bg-white hover:bg-amber-200 active:bg-amber-300 w-45 border-2 border-black cursor-pointer"
                  // onClick={() => navigate("/another")}
                  onClick={() => {
                    setNoCount((prev) => prev + 1);
                    window.open("/another", "_blank");
                  }}
                >
                  No {noCount}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
