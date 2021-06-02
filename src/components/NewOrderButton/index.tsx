import React from "react";
import styles from "./NewOrder.module.scss";

type Props = {
  onClick: () => void;
};

export default function NewOrderButton({ onClick }: Props) {
  const { root } = styles;
  return (
    <button className={root} onClick={onClick}>
      Novo pedido +
    </button>
  );
}
