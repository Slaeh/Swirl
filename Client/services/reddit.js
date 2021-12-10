import axios from "axios";
const baseURL = "https://www.reddit.com/.json?limit=11";

const getRedditData = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export default { getRedditData };
