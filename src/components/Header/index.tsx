import React from "react";
import NewOrderButton from "../NewOrderButton";
import Modal from "../Modal";
import OrderFlow from "../OrderFlow";
import StepButton from "../StepButton";
import styles from "./Header.module.scss";

export default function index() {
  const { root } = styles;

  return (
    <div className={root}>
      <h1>Pedidos</h1>
      <NewOrderButton />
      <Modal context="newOrder" title="Novo pedido" confirm={<StepButton />}>
        <OrderFlow />
      </Modal>
    </div>
  );
}
