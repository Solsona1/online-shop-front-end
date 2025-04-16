import productsData from "../mock-data/products.mock.json";
import storeData from "../mock-data/store.mock.json";
import categoriesData from "../mock-data/category.mock.json";
import { Category, Product, Store } from "../types";

export const getAllProducts = () => {
  return productsData as Product[];
};

export const getProductsByCategory = (categoryId: number) => {
  if (Number(categoryId) === 0) return getAllProducts();
  return productsData.filter(
    product => product.category.id === Number(categoryId),
  ) as Product[];
};

export const getOneProduct = (id: number) => {
  return productsData.filter(product => product.id === id)[0];
};

export const deleteProduct = (id: number) => {
  alert("Deleted product: " + id);
};

export const getProductPDF = (id: number) => {
  alert("PDF of product: " + id);
};

export const getStore = () => {
  return storeData as Store;
};

export const getAllCategories = () => {
  return categoriesData as Category[];
};
