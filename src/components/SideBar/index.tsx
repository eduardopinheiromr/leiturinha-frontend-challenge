import React from "react";
import styles from "./SideBar.module.scss";
import { useStore } from "src/stores";
import { transformNumberIntoBRL } from "src/utils";
import { observer } from "mobx-react-lite";

const index = observer(() => {
  const { root } = styles;
  const store = useStore();

  const orders = store.getOrders();

  // const total = orders
  //   .map(order => order.total)
  //   .reduce((total, current) => total + current);

  return (
    <div className={root}>
      <div>
        <img
          loading="lazy"
          src="/assets/images/logo.png"
          alt="Logo do restaurante"
          className="h-12 w-12 md:h-64 md:w-64"
        />
      </div>
      <div className="text-secondary text-center flex md:flex-col w-full mr-3">
        <p className="md:text-9xl ml-auto mr-2 md:m-0 ">{orders.length}</p>
        <p> pedido{orders.length > 1 && "s"} em aberto</p>
      </div>
      {/* <p>Total faturado até o momento {transformNumberIntoBRL(total)}</p> */}
    </div>
  );
});

export default index;
