import { makeAutoObservable } from "mobx";
import { createContext, useContext, useEffect, FC } from "react";
import { Order, Product } from "./types";
import { getAllProducts } from "../services/products";
import { transformNumberIntoBRL } from "src/utils";

export const orderInitialState = {
  id: 0,
  datetime: new Date(),
  customerName: "",
  orderedItems: [],
  total: "",
  payment: {
    name: "",
    cardNumber: "",
    goodThru: "",
    cvv: "",
  },
};

class ProductsStore {
  products: Product[] = [];
  newOrder: Order = orderInitialState;
  orders: Order[] = [];
  step: number = 1;
  modal: boolean = false;

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
    const total = transformNumberIntoBRL(
      order.orderedItems
        .map(item => item.price * item.quantity)
        .reduce((total, current) => total + current)
    );

    this.orders.push({
      ...order,
      id: this.orders.length + 1,
      datetime: new Date(),
      total,
    });
  }

  getStep() {
    return this.step;
  }

  setStep(step: number) {
    this.step = step;
  }

  getModal() {
    return this.modal;
  }

  toggleModal(modal: boolean) {
    this.modal = modal;
  }
}

const StoreContext = createContext<ProductsStore>(new ProductsStore());

const StoreProvider: FC<{ store: ProductsStore }> = ({ store, children }) => {
  useEffect(() => {
    if (store.products.length === 0) {
      store.loadProducts();
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
