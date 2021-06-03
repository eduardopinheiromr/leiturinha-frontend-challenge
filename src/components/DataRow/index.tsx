import React from "react";
import { Order } from "src/stores/types";
import styles from "./DataRow.module.scss";

type Props = {
  order: Order;
  onClick: () => void;
};

export default function DataRow({ order, onClick }: Props) {
  const { root } = styles;

  const { id, customerName, total, datetime } = order;

  return (
    <li className={root} onClick={onClick}>
      <p>#{id}</p>
      <p>{customerName}</p>
      <p>{total}</p>
      <p>
        Pedido feito as <br />
        {new Date(datetime).toLocaleTimeString()}
      </p>
    </li>
  );
}
