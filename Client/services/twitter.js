import axios from "axios";
const baseURL = "http://localhost:5000/api/twitterFeed";

const getTwitterData = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export default { getTwitterData };
