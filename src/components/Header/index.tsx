import React from "react";
import NewOrderButton from "../NewOrderButton/index";
import styles from "./Header.module.scss";

export default function index() {
  const { root } = styles;
  return (
    <div className={root}>
      <h1>Orders</h1>
      <NewOrderButton />
    </div>
  );
}
