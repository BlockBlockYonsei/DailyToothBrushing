import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";

import { Transaction } from "@mysten/sui/transactions";
import RainbowBox from "./RainbowBox";
import { useGetMyToothBruhsing } from "./hooks/toothbruhsing";
import { PACKAGE_ID } from "./Constants";
import { ToothBruhsingObjectData } from "./types/toothbruhsing";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [isTeethClean, setIsTeethClean] = useState(false);
  const [recentToothBruhsing, setRecentToothBruhsing] =
    useState<ToothBruhsingObjectData>();

  const account = useCurrentAccount();
  const wallets = useWallets();

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const { toothbruhsings } = useGetMyToothBruhsing({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    console.log("no count", noCount);
  }, [noCount]);

  useEffect(() => {
    if (toothbruhsings && toothbruhsings.length > 0) {
      setRecentToothBruhsing(toothbruhsings[0]);
    }
  }, [toothbruhsings]);

  useEffect(() => {
    if (recentToothBruhsing) {
      console.log("recent", recentToothBruhsing);
      const timestampMs = Date.now();
      const eightHours = 8 * 60 * 60 * 1000;

      if (
        timestampMs >
        Number(recentToothBruhsing.content.fields.timestamp) + eightHours
      ) {
        console.log("oh shit");
        setIsTeethClean(false);
      } else {
        console.log("oh yes");
        setIsTeethClean(true);
      }
    }
  }, [recentToothBruhsing]);

  const onYesButtonClick = async () => {
    if (!account) return;
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::toothbruhsing::brush_my_teeth`,
      arguments: [tx.object.clock()],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: (result) => {
          console.log("success", result);
          window.location.reload();
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
            <div className="flex flex-col items-center py-2">
              <p className="text-center text-lg font-bold">{account.label}</p>
              <Button
                className="w-45 bg-black text-white hover:bg-blue-200"
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
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
                <p className="cursor-pointer">
                  click here to enter the dungeon of tooth battle
                </p>
              </div>
              <img className="w-45 h-auto" src="/banner-img1.png" />
            </div>
            <div className="flex flex-col justify-center items-center -space-y-5">
              {isTeethClean ? (
                <img className="h-60 w-full z-10" src="/clean-up.png" />
              ) : (
                <img
                  className="h-60 w-full z-10 object-cover object-top"
                  src="/dirty-up.png"
                />
              )}
              <div className="bg-slate-700 border-2 p-5 border-black z-100 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center ">
                  <p className="text-4xl font-bold ">
                    <span className="text-white">Did you </span>
                    <span className="text-purple-600">brush your teeth?</span>
                  </p>
                  <div className="flex justify-around items-center w-[200px]">
                    <Button
                      className="text-4xl text-red-600 active:bg-amber-300 cursor-pointer"
                      onClick={onYesButtonClick}
                    >
                      Yes
                    </Button>
                    <p className="text-4xl text-white">/</p>
                    <Button
                      className="text-4xl text-cyan-600 active:bg-amber-300 cursor-pointer"
                      onClick={() => {
                        setNoCount((prev) => prev + 1);
                        window.open(
                          "https://www.health.harvard.edu/blog/one-more-reason-to-brush-your-teeth-202402263019",
                          "_blank"
                        );
                      }}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
              {isTeethClean ? (
                <img className="h-60 w-full z-10" src="/clean-down.png" />
              ) : (
                <img
                  className="h-60 w-full z-10 object-cover object-bottom"
                  src="/dirty-down.png"
                />
              )}
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
            <RainbowBox />
            <div className="flex justify-between h-[200px]">
              <img
                className="border-2 border-black w-auto h-full"
                src="/info1.png"
              />
              <img
                className="border-2 border-black w-auto h-full"
                src="/info2.png"
              />
              <img
                className="border-2 border-black w-auto h-full"
                src="/info3.png"
              />
            </div>
            <div>
              <h2 className="font-semibold">
                The Proper Way to Brush Your Teeth
              </h2>
              <p>
                Brushing your teeth helps remove plaque and bacteria that
                continually form on teeth and around the gumline. When not
                removed regularly, plaque can lead to cavities, tooth decay, and
                even periodontal disease. A proper brushing technique can
                protect teeth from decay and disease. Follow these steps:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  Step 1: Start with the outer surfaces of your teeth. Take your
                  time! Gently brush upper and then lower teeth. Going tooth by
                  tooth can help you slow down and not miss any spots.
                </li>
                <li>
                  Step 2: Tilt your brush at a 45° angle. Brush against the
                  gumline to get rid of any trapped plaque or food debris.
                  Gently move the brush back and forth using short, tooth-wide
                  strokes.
                </li>
                <li>
                  Step 3: Brush the inner surface of your teeth. Because the
                  insides of your teeth are not as visible, skipping them is
                  tempting –but these inner surfaces are just as vulnerable to
                  plaque. Use a 45° angle to brush back and forth to clean the
                  inside surfaces of the teeth.
                </li>
                <li>
                  Step 4: Clean the chewing surfaces of your teeth. Don't forget
                  to use short back and forth strokes to brush the tops of your
                  back teeth, where food can easily get trapped.
                </li>
                <li>
                  Step 5: Brush your tongue. For fresher breath, brush your
                  tongue to remove odor-causing bacteria.
                </li>
              </ul>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => {
                window.open("https://x.com/toothfairysui", "_blank");
              }}
            >
              <img src="/follow-us-x.png" />
            </button>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
