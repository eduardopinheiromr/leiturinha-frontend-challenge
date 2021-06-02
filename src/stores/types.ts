export type Product = {
  id: number;
  category: Categories;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  datetime: Date;
  customerName: string;
  orderedItems: Product[];
  total: number;
};

export type Categories = "food" | "drink";
