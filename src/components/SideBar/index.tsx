import React from "react";
import styles from "./SideBar.module.scss";
const index = () => {
  const { root } = styles;
  return (
    <div className={root}>
      <h1>Barra lateral</h1>
      <p>foto do restaurante aqui</p>
      <p>número de pedidos em aberto</p>
      <p>total faturado até o momento</p>
    </div>
  );
};

export default index;
