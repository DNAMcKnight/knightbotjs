import axios from "axios";
import { config } from "dotenv";

config();

const COC_TOKEN = process.env.COC_TOKEN;
const headers = {
  Accept: "application/json",
  authorization: `Bearer ${COC_TOKEN}`,
};

export const getPlayer = async (tag) => {
  const url = `https://api.clashofclans.com/v1/players/%23${tag.replace(
    "#",
    ""
  )}`;
  const response = await axios.get(url, { headers: headers });
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};
