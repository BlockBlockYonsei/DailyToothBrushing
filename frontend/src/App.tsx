import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import { Transaction } from "@mysten/sui/transactions";
// import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
// import { WebCryptoSigner } from "@mysten/signers/webcrypto";

// const client = new SuiClient({ url: getFullnodeUrl("testnet") });

function App() {
  const [noCount, setNoCount] = useState(0);
  const [digest, setDigest] = useState("");

  const account = useCurrentAccount();
  const wallets = useWallets();
  // const location = useLocation();
  // const navigate = useNavigate();

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
                className="w-45 bg-black text-white hover:bg-blue-200"
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
          <div className="">
            <div className="flex justify-between bg-gray-800 text-red-500">
              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-4xl">Ready to join dental arena?</p>
                <p>click here to enter the dungeon of tooth battle</p>
              </div>
              <img className="w-45 h-auto" src="/banner-img1.png" />
            </div>
            <div className="flex flex-col justify-center items-center -space-y-5">
              <img className="h-auto w-full z-10" src="/clean-up.png" />
              <div className="bg-slate-700 border-2 p-5 border-black z-100 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center ">
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
            <div>
              <p className="text-red-500">
                Tooth brushing is the act of scrubbing teeth with a toothbrush
                equipped with toothpaste. Interdental cleaning (with floss or an
                interdental brush) can be useful with tooth brushing, and
                together these two activities are the primary means of cleaning
                teeth, one of the main aspects of oral hygiene.[1] The
                recommended amount of time for tooth brushing is two minutes
                each time for two times a day.[2]
              </p>
            </div>
            <div className="flex justify-between h-[250px]">
              <img className="w-auto h-full" src="/brush1.png" />
              <img className="w-auto h-full" src="/brush2.png" />
              <img className="w-auto h-full" src="/brush3.png" />
            </div>
            <RainbowBox></RainbowBox>
            <div className="flex justify-between h-[200px]">
              <img className="w-auto h-full" src="/info1.png" />
              <img className="w-auto h-full" src="/info2.png" />
              <img className="w-auto h-full" src="/info3.png" />
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default App;

function RainbowBox() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+RO:wght@100..400&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-[600px] w-full mx-auto my-12 p-8 rounded-lg 
                      bg-gradient-to-b from-red-500  via-yellow-300 
                     to-violet-500 
                      text-white text-[1.2em] leading-tight"
      >
        <h1 className="text-black text-4xl text-center mb-4 font-playwrite">
          History
        </h1>
        <p className="underline font-playwrite">
          Teeth-cleaning twigs have long been used throughout human history.[3]
          As long ago as 3000 B.C., the ancient Egyptians constructed crude
          toothbrushes from twigs and leaves to clean their teeth. Similarly,
          other cultures such as the Greeks, Romans, Arabs and Indians also
          cleaned their teeth with twigs. Some would fray one end of the twig so
          that it could penetrate between the teeth more effectively. In the
          Islamic prophetic tradition, Muhammad taught his disciples to brush
          their teeth using miswak five times per day, and this remains
          prevalent amongst many Muslims world wide since 610 A.D.[4] The Indian
          method of using wood for brushing was presented by the Chinese Monk
          Yijing (635–713 A.D.) when he described the rules for monks in his
          book:[5] Every day in the morning, a monk must chew a piece of tooth
          wood to brush his teeth and scrape his tongue, and this must be done
          in the proper way. Only after one has washed one's hands and mouth may
          one make salutations. Otherwise both the saluter and the saluted are
          at fault. In Sanskrit, the tooth wood is known as the
          dantakastha—danta meaning tooth, and kastha, a piece of wood. It is
          twelve finger-widths in length. The shortest is not less than eight
          finger-widths long, resembling the little finger in size. Chew one end
          of the wood well for a long while and then brush the teeth with it.
          Brushing teeth with chewing stick. Modern-day tooth brushing as a
          regular habit became prevalent in Europe from the end of the 17th
          century. The first mass-produced toothbrush was developed in England
          in 1780 by William Addis. In the United States, although toothbrushes
          were available at the end of the 19th century, the practice did not
          become widespread until after the Second World War, when US soldiers
          continued the tooth brushing that had been required during their
          military service.[6]
        </p>
      </div>
    </>
  );
}
