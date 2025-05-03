import { PACKAGE_ID } from "@/Constants";
import { ToothBruhsingObjectData } from "@/types/toothbruhsing";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect, useState } from "react";

export const useGetMyToothBruhsing = ({ owner }: { owner: string }) => {
  const [toothbruhsings, setToothBruhsings] = useState<
    ToothBruhsingObjectData[]
  >([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

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
        const datasWithoutNull = data.data
          .flatMap((d) => {
            if (!d) return [];
            return d;
          })
          .map((d) => {
            return d.data as ToothBruhsingObjectData;
          });
        setToothBruhsings(datasWithoutNull);
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
