import axios from "axios";
import { hasOnlyExpressionInitializer } from "typescript";

const delay = () =>
  new Promise((resolve) => setTimeout(() => resolve(""), 400));

const axiosApi = axios.create({
  baseURL: "http://localhost:3000/",
});
const productsEndpoint = "products";

const fetchProducts = async () => {
  await delay();
  try {
    const { data } = await axiosApi.get(productsEndpoint);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const buyProducts = async (cartProducts) => {
  return axiosApi.patch(productsEndpoint, cartProducts);
};

export { fetchProducts, buyProducts };
