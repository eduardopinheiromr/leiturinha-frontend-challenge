import { Categories, Product } from "../stores/types";

export const filterByCategory = (products: Product[], category: Categories) =>
  products.filter(product => product.category === category);

export const transformNumberIntoBRL = (number: number) =>
  number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
