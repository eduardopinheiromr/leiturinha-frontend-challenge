import React from "react";
import styles from "./SideBar.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

const SideBar = observer(() => {
  const { root, logo, ordersStyle, moduleNavigation } = styles;
  const store = useStore();

  const orders = store.getOrders();

  const module = store.getModule();

  const otherModuleLabel = module === "orders" ? "Faturamento" : "Pedidos";
  const otherModule = module === "orders" ? "billing" : "orders";

  return (
    <div className={root}>
      <div>
        <img
          src="/assets/images/logo.png"
          alt="Logo do restaurante"
          className={logo}
        />
      </div>
      <div className={ordersStyle}>
        <p>{orders.length}</p>
        <p> pedido{(orders.length === 0 || orders.length > 1) && "s"}</p>
      </div>

      <div className={moduleNavigation}>
        <button onClick={() => store.setModule(otherModule)}>
          {otherModuleLabel}
        </button>
      </div>
    </div>
  );
});

export default SideBar;
