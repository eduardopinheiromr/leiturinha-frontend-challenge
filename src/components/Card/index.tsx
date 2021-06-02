import React, { useCallback } from "react";
import { Product } from "src/stores/types";
import { transformNumberIntoBRL } from "src/utils";
import styles from "./Card.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

type Props = {
  product: Product;
};

const index = observer(({ product }: Props) => {
  const { root } = styles;
  const store = useStore();
  const newOrder = store.getNewOrder();

  const addProduct = () => {
    if (
      newOrder.orderedItems.filter(
        orderedItem => orderedItem.name === product.name
      ).length === 0
    ) {
      store.setNewOrder({
        ...newOrder,
        orderedItems: [...newOrder.orderedItems, { ...product, quantity: 1 }],
      });
      return;
    }
    const orderedItems = newOrder.orderedItems.map(orderedItem => {
      if (orderedItem.name === product.name && orderedItem.quantity) {
        return {
          ...orderedItem,
          quantity: orderedItem.quantity + 1,
        };
      }
      return orderedItem;
    });
    store.setNewOrder({ ...newOrder, orderedItems });
  };

  const removeProduct = () => {
    const removedProducts = newOrder.orderedItems.map(orderedItem => {
      if (orderedItem.name === product.name) {
        return {
          ...orderedItem,
          quantity: orderedItem.quantity - 1,
        };
      }
      return orderedItem;
    });

    const orderedItems = removedProducts.filter(
      filteredItem => filteredItem.quantity > 0
    );

    store.setNewOrder({
      ...newOrder,
      orderedItems,
    });
  };

  const quantity = newOrder.orderedItems
    .filter(orderedItem => orderedItem.name === product.name)
    .pop()?.quantity;

  return (
    <div className="relative">
      {quantity && (
        <div
          className="absolute h-12 w-12 flex justify-center items-center rounded-full bg-black text-white"
          style={{ right: 5 }}
        >
          <div className="text-xl">{quantity}</div>
        </div>
      )}
      <div className={root}>
        <p className="font-bold text-xl">{product.name}</p>
        <p className="h-24">{product.description}</p>
        <div className="flex mt-4 items-center h-12">
          <div className="flex">
            <button
              disabled={quantity === undefined}
              onClick={() => removeProduct()}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-black text-white cursor-pointer disabled:bg-gray-300"
            >
              -
            </button>
            <div
              onClick={() => addProduct()}
              className="ml-3 h-12 w-12 flex items-center justify-center rounded-full bg-black text-white  cursor-pointer"
            >
              +
            </div>
          </div>
          <p className="ml-auto text-2xl">
            {transformNumberIntoBRL(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
});

export default index;
