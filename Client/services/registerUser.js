import axios from "axios";
const baseUrl = "http://localhost:5000/api/users";

import Constants from "expo-constants";
const { manifest } = Constants;

const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? "http://" +
      manifest.debuggerHost.split(`:`).shift().concat(`:5000/api/users`)
    : `http://localhost:5000/api/users`;
console.log("api is", api);
const registerUser = async (credentials) => {
  const response = await axios.post(api, credentials);
  return response.data;
};

export default { registerUser };
