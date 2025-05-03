import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { useLocation } from "react-router-dom";
import { Link } from "lucide-react";
import { navigateWithQuery } from "./lib/utils";
import { useNavigate } from "react-router-dom";

function App() {
  const [noCount, setNoCount] = useState(0);
  const account = useCurrentAccount();
  const wallets = useWallets();
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();

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
        <div className="flex min-h-45 w-full border-2 border-black items-center justify-around">
          <Button className="hover:bg-amber-200 active:bg-amber-300 w-45 border-2 border-black cursor-pointer">
            Yes
          </Button>
          <Button
            className="hover:bg-amber-200 active:bg-amber-300 w-45 border-2 border-black cursor-pointer"
            onClick={() => navigate("/target-path")}
          >
            No
          </Button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
