import React from "react";
import { useStore } from "src/stores";
import DataRow from "../DataRow";
import { observer } from "mobx-react-lite";
import styles from "./OrdersList.module.scss";

const index = observer(() => {
  const store = useStore();
  const orders = store.getOrders();

  const haveOrders = orders.length > 0;
  return (
    <div>
      {haveOrders &&
        orders.map((order, key) => <DataRow key={key} order={order} />)}

      {!haveOrders && (
        <div className={styles.noData}>
          <p>Não há pedidos</p>
          <img
            loading="lazy"
            src="/assets/images/waiters-animate.svg"
            alt="Não há pedidos"
          />
        </div>
      )}
    </div>
  );
});

export default index;
