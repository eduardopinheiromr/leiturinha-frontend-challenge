import React from "react";
import { Order } from "src/stores/types";
import styles from "./DataRow.module.scss";

type Props = {
  order: Order;
};

export default function index({ order }: Props) {
  const { root } = styles;

  return (
    <div className={root}>
      <h3>#{order.id}</h3>
      <h3>{order.customerName}</h3>
      <h3>{order.total}</h3>
      <h3>
        Pedido feito as <br />
        {new Date(order.datetime).toLocaleTimeString()}
      </h3>
    </div>
  );
}
