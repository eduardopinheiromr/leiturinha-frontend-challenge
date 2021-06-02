import React from "react";
import styles from "./NewOrder.module.scss";
import { useStore } from "src/stores";

export default function NewOrderButton() {
  const { root } = styles;

  const store = useStore();

  return (
    <button className={root} onClick={() => store.toggleModal(true)}>
      Novo pedido +
    </button>
  );
}
