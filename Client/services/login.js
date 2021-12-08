import axios from "axios";
const baseUrl = "http://localhost:5000/api/login";

const login = async (credentials) => {
  console.log("YESSIR");
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
