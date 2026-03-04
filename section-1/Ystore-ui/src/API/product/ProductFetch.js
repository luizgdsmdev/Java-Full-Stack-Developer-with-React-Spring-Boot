import apiClient from "../ApiClient";
//import { delay } from "../../utils/delay";

export const fetchProductsAPI = async () => {

  //await delay(3);
  try {
    const response = await apiClient.get("/products");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};