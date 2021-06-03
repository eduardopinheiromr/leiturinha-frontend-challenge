import React from "react";
import styles from "./Payment.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { sumTotalPrice } from "src/utils";
import CreditCard from "../CreditCard";

const Payment = observer(() => {
  const { root } = styles;

  const store = useStore();
  const newOrder = store.getNewOrder();

  const total = sumTotalPrice(newOrder.orderedItems);

  return (
    <div className={root}>
      <div>
        <p>Total</p>
        <p>{total}</p>
      </div>
      <h3>Digite os dados do cartão</h3>
      <CreditCard />
    </div>
  );
});

export default Payment;
