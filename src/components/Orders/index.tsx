import React from "react";
import Header from "../Header";
import OrdersList from "../OrdersList";
import styles from "./Orders.module.scss";

export default function index() {
  const { root } = styles;

  return (
    <div className={root}>
      <Header title="Pedidos" />
      <OrdersList />
    </div>
  );
}
