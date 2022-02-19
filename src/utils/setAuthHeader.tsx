import axios from "axios";

export const setAuthHeader = (access_token: string) => {
  try {
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    }
  } catch (error) {
    console.log("Error setting auth", error);
  }
};
