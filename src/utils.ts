import { MetadataCb } from ".";
import fetch from "node-fetch";

export const fetchMetadata =
  (cb: MetadataCb) =>
  async (uri: string): Promise<{ name: string; image: string }> => {
    const res = await fetch(uri).then((r) => r.json());
    return cb(res);
  };
