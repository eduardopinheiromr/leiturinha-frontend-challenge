import { makeAutoObservable } from "mobx";
import { createContext, useContext, useEffect, FC } from "react";
import { ModalContext, Order, Product } from "./types";
import { getAllProducts } from "../services/products";
import { sumTotalPrice } from "src/utils";
import axios from "axios";

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
  modal: {
    newOrder: boolean;
    openOrder: boolean;
  } = { newOrder: false, openOrder: false };
  toast: boolean = false;
  orderOpened: Order = orderInitialState;

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

  async addNewOrder(order: Order) {
    const total = sumTotalPrice(order.orderedItems);

    const { data } = await axios.post("http://localhost:3000/api/checkout", {
      creditCard: order.payment,
    });

    console.log(data);

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

  getModal(context: ModalContext) {
    switch (context) {
      case "newOrder":
        return this.modal.newOrder;

      case "openOrder":
        return this.modal.openOrder;

      default:
        break;
    }
  }

  toggleModal(context: ModalContext, modal: boolean) {
    switch (context) {
      case "newOrder":
        return (this.modal.newOrder = modal);

      case "openOrder":
        return (this.modal.openOrder = modal);

      default:
        break;
    }
  }

  getOrderOpened() {
    return this.orderOpened;
  }

  setOrderOpened(order: Order) {
    this.orderOpened = order;
  }

  getToast() {
    return this.toast;
  }

  toggleToast() {
    this.toast = !this.toast;
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
