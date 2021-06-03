import axios from "axios";
import { Product } from "../stores/types";

export const getAllProducts = async (): Promise<Product[]> =>
  await axios
    .get("https://5ff37c3328c3980017b195e8.mockapi.io/api/products")
    .then(response => response.data)
    .catch(error => error.response);
