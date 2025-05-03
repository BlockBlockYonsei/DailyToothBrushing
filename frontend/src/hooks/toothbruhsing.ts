import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";

export const useGetMyCollections = ({ owner }: { owner: string }) => {
  const [toothbruhsings, setToothBruhsings] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
  const TYPE = `${PACKAGE_ID}::toothbruhsing::ToothBruhsing`;

  const client = new SuiClient({ url: getFullnodeUrl("testnet") });
  useEffect(() => {
    client
      .getOwnedObjects({
        owner,
        filter: { StructType: TYPE },
        options: {
          showType: true,
          showContent: true,
        },
      })
      .then((data) => {
        console.log(data);
        setToothBruhsings(data);
        setIsPending(false);
      })
      .catch((e) => setError(e))
      .finally();
  }, [owner]);

  return {
    toothbruhsings,
    isPending,
    error,
  };
};
