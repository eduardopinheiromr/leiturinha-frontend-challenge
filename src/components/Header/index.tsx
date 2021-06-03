import React from "react";
import NewOrderButton from "../NewOrderButton";
import Modal from "../Modal";
import OrderFlow from "../OrderFlow";
import StepButton from "../StepButton";
import styles from "./Header.module.scss";

type Props = {
  title: string;
};

export default function index({ title }: Props) {
  const { root } = styles;

  return (
    <div className={root}>
      <h1>{title}</h1>
      {title === "Pedidos" && (
        <>
          <NewOrderButton />
          <Modal
            context="newOrder"
            title="Novo pedido"
            confirm={<StepButton />}
          >
            <OrderFlow />
          </Modal>
        </>
      )}
    </div>
  );
}
