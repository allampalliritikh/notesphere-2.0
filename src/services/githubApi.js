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
export const fetchAllContents = async (path = "") => {
  let allItems = [];

  const items = await fetchContents(path);

  for (const item of items) {
    allItems.push(item);

    if (item.type === "dir") {
      const nestedItems = await fetchAllContents(item.path);

      allItems = [...allItems, ...nestedItems];
    }
  }

  return allItems;
};