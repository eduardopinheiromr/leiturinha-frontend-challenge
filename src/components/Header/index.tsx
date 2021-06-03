import React from "react";
import NewOrderButton from "../NewOrderButton";
import Modal from "../Modal";
import OrderFlow from "../OrderFlow";
import StepButton from "../StepButton";
import styles from "./Header.module.scss";
import SearchBar from "../SearchBar";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const { root } = styles;

  return (
    <header className={root}>
      <h1>{title}</h1>
      {title === "Pedidos" && (
        <>
          <SearchBar />
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
    </header>
  );
}
