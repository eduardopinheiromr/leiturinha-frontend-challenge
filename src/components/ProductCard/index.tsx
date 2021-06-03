import React from "react";
import { Product } from "src/stores/types";
import { transformNumberIntoBRL } from "src/utils";
import styles from "./ProductCard.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

type Props = {
  product: Product;
  readOnly?: boolean;
};

const ProductCard = observer(({ product, readOnly }: Props) => {
  const { root, quantityStyle, card, quantityBadge, priceBadge, actions } =
    styles;
  const store = useStore();
  const newOrder = store.getNewOrder();

  const addProduct = () => {
    const isFirstProduct =
      newOrder.orderedItems.filter(
        orderedItem => orderedItem.name === product.name
      ).length === 0;

    if (isFirstProduct) {
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

  const productDescription =
    product.description.length === 0
      ? "Produto sem descrição."
      : product.description;

  return (
    <div className={root}>
      {quantity && (
        <div className={quantityStyle}>
          <p>{quantity}</p>
        </div>
      )}
      {readOnly && (
        <>
          <div className={quantityBadge}>
            <p>{product.quantity}</p>
          </div>
          <div className={priceBadge}>
            <p>{transformNumberIntoBRL(product.price * product.quantity)}</p>
          </div>
        </>
      )}
      <div className={`${card} ${readOnly ? "h-60" : "h-72 sm:h-60"}`}>
        <p>{product.name}</p>
        <p>{productDescription}</p>
        {!readOnly && (
          <div className={actions}>
            <div>
              <button
                disabled={quantity === undefined}
                onClick={() => removeProduct()}
              >
                -
              </button>
              <button onClick={() => addProduct()} className="ml-3">
                +
              </button>
            </div>
            <p>{transformNumberIntoBRL(product.price)}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductCard;
