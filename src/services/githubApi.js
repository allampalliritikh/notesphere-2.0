import axios from "axios";

const BASE_URL =
  "https://api.github.com/repos/allampalliritikh/8th-Sem/contents";

export const fetchContents = async (path = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/${path}`);
    return response.data;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return [];
  }
};