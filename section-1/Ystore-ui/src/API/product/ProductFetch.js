import apiClient from "../ApiClient";

export const fetchProductsAPI = async () => {
  try {
    const response = await apiClient.get("/products");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};