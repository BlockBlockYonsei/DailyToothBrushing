export type ToothBruhsing = {
  timestamp: string;
  id: {
    id: string;
  };
};

export interface ToothBruhsingObjectData {
  objectId: string;
  version: string;
  digest: string;
  type: string;
  content: {
    dataType: string;
    type: string;
    hasPublicTransfer: boolean;
    fields: ToothBruhsing;
  };
}
