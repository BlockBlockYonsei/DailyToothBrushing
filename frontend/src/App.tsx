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
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { WebCryptoSigner } from "@mysten/signers/webcrypto";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });

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

  useEffect(() => {
    // console.log("wallet", wallets);
    console.log("account", account?.chains);
  }, [wallets, account]);

  const onYesButtonClick = async () => {
    // const keypair = await WebCryptoSigner.generate();

    const tx = new Transaction();
    const PACKAGE_ID =
      "0x2ea277f1ee7e6fb18a7dc4bff2f84773204ad2a89cfb7e931633b9d428870bd7";

    tx.moveCall({
      target: `${PACKAGE_ID}::toothburshing::brush_my_teeth`,
      arguments: [tx.object.clock()],
    });

    // await tx.build({ client });

    console.log("tx", tx);
    // client.signAndExecuteTransaction({ transaction: tx, signer: keypair });
    signAndExecuteTransaction(
      {
        transaction: tx,
        // chain: "sui:testnet",
        chain: account?.chains[0],
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
  };

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
        {account && (
          <div className="flex min-h-45 w-full items-center justify-around">
            <div className="flex flex-col justify-center items-center -space-y-5">
              <img className="h-auto w-full z-10" src="/clean-up.png" />
              <div className="bg-slate-700 border-2 w-[500px] border-black z-100">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-4xl font-bold ">
                    <span className="text-white">Did you </span>
                    <span className="text-purple-600">brush your teeth?</span>
                  </p>
                  <div className="flex justify-around items-center w-[200px]">
                    <Button
                      className="hover:bg-amber-200 text-4xl text-red-600 active:bg-amber-300 cursor-pointer"
                      onClick={onYesButtonClick}
                    >
                      Yes
                    </Button>
                    <p className="text-4xl text-white">/</p>
                    <Button
                      className="hover:bg-amber-200 text-4xl text-cyan-600 active:bg-amber-300 cursor-pointer"
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
              <img className="h-auto w-full z-10" src="/clean-down.png" />
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
