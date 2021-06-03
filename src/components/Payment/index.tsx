import React from "react";
import styles from "./Payment.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { sumTotalPrice } from "src/utils";
import CreditCard from "../CreditCard";

const index = observer(() => {
  const { root } = styles;

  const store = useStore();
  const newOrder = store.getNewOrder();

  const total = sumTotalPrice(newOrder.orderedItems);

  return (
    <div className={root}>
      <div className="text-center flex flex-col items-center justify-center px-10 h-36 border m-5">
        <p className="text-3xl">Total</p>
        <p className="text-5xl font-bold">{total}</p>
      </div>
      <h3>Digite os dados do cartão</h3>
      <CreditCard />
    </div>
  );
});

export default index;
