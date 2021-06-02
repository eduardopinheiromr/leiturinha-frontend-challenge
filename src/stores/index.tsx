import { makeAutoObservable } from "mobx";
import { createContext, useContext, useEffect, FC } from "react";
import { Order, Product } from "./types";
import { getAllProducts } from "../services/products";

export const orderInitialState = {
  id: 0,
  datetime: new Date(),
  customerName: "",
  orderedItems: [],
  total: 0,
};

class ProductsStore {
  products: Product[] = [];
  newOrder: Order = orderInitialState;
  orders: Order[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadProducts() {
    this.products = await getAllProducts();
  }

  getProducts() {
    return this.products;
  }

  getOrders() {
    return this.orders;
  }

  getNewOrder() {
    return this.newOrder;
  }

  setNewOrder(newOrder: Order) {
    this.newOrder = newOrder;
  }

  addNewOrder(order: Order) {
    this.orders.push({
      ...order,
      id: this.orders.length + 1,
      datetime: new Date(),
    });
  }
}

const StoreContext = createContext<ProductsStore>(new ProductsStore());

const StoreProvider: FC<{ store: ProductsStore }> = ({ store, children }) => {
  useEffect(() => {
    if (store.products.length === 0) {
      store.loadProducts();
      console.log(store.products.length);
    }
  }, [store.products]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { ProductsStore, StoreProvider, useStore };
