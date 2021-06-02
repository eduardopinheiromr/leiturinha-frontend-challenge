import React, { useState } from "react";
import NewOrderButton from "../NewOrderButton";
import Modal from "../Modal";
import OrderFlow from "../OrderFlow";
import StepButton from "../StepButton";
import styles from "./Header.module.scss";

export default function index() {
  const { root } = styles;

  const [modal, toggleModal] = useState(false);

  return (
    <div className={root}>
      <h1>Pedidos</h1>
      <NewOrderButton onClick={() => toggleModal(true)} />
      <Modal
        title="Novo pedido"
        confirm={<StepButton />}
        open={modal}
        onClose={() => toggleModal(false)}
      >
        <OrderFlow closeModal={() => toggleModal(false)} />
      </Modal>
    </div>
  );
}
