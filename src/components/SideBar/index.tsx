import React from "react";
import styles from "./SideBar.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

const index = observer(() => {
  const { root } = styles;
  const store = useStore();

  const orders = store.getOrders();

  const module = store.getModule();

  const otherModuleLabel = module === "orders" ? "Faturamento" : "Pedidos";
  const otherModule = module === "orders" ? "billing" : "orders";

  return (
    <div className={root}>
      <div>
        <img
          loading="lazy"
          src="/assets/images/logo.png"
          alt="Logo do restaurante"
          className="h-20 w-28 md:h-64 md:w-64"
        />
      </div>
      <div className="text-secondary text-center flex md:flex-col w-full mr-3">
        <p className="md:text-9xl ml-auto mr-2 md:m-0 ">{orders.length}</p>
        <p> pedido{(orders.length === 0 || orders.length > 1) && "s"}</p>
      </div>

      <div className="md:mt-5">
        <button
          onClick={() => store.setModule(otherModule)}
          className="h-8 mr-3 md:h-12 md:mr-0 rounded-xl bg-secondary px-3"
        >
          {otherModuleLabel}
        </button>
      </div>
    </div>
  );
});

export default index;
