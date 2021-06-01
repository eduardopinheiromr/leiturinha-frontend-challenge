import React from "react";
import { Product } from "src/stores/types";
import styles from "./DataRow.module.scss";

type Props = {
  product: Product;
  id: number;
};

export default function index({ product, id }: Props) {
  const { root } = styles;
  return (
    <div className={root}>
      <h3>#{id}</h3>
      <h3>{product.name}</h3>
      <h3>{new Date().toLocaleTimeString()}</h3>
    </div>
  );
}
