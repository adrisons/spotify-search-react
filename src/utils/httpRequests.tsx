import axios from "axios";
import { setAuthHeader } from "./setAuthHeader";

export const get = async (url: string, accessToken: string) => {
  setAuthHeader(accessToken);
  const result = await axios.get(url);
  return result.data;
};
