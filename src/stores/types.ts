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
  total: string;
  payment: CreditCard;
};

export type CreditCard = {
  name: string;
  cardNumber: string;
  goodThru: string;
  cvv: string;
};

export type Result = {
  name: string;
  quantity: number;
  total: number;
  category: string;
};

export type Module = "orders" | "billing";

export type ModalContext = "newOrder" | "openOrder";

export type Categories = "food" | "drink";
