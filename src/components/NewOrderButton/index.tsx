import React from "react";
import styles from "./NewOrder.module.scss";

export default function NewOrderButton() {
  const { root } = styles;
  return <button className={root}>New Order +</button>;
}
