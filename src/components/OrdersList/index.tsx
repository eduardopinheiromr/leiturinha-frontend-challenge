import React from "react";
import { useStore } from "src/stores";
import DataRow from "../DataRow";
import ProductCard from "../ProductCard";
import Modal from "../Modal";
import { observer } from "mobx-react-lite";
import styles from "./OrdersList.module.scss";

const index = observer(() => {
  const store = useStore();
  const orders = [...store.getOrders()].sort((a, b) => b.id - a.id);

  const orderOpened = store.getOrderOpened();

  const haveOrders = orders.length > 0;
  return (
    <div>
      {haveOrders &&
        orders.map((order, key) => (
          <DataRow
            key={key}
            order={order}
            onClick={() => {
              store.toggleModal("openOrder", true);
              store.setOrderOpened(order);
            }}
          />
        ))}

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

      <Modal
        size="md"
        context="openOrder"
        title={`Pedido N#${orderOpened.id} - ${orderOpened.customerName}`}
      >
        <div className="flex flex-col md:flex-row">
          <div>
            {orderOpened.orderedItems.map((product, key) => (
              <div className="mb-10" key={key}>
                <ProductCard product={product} readOnly />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="text-center flex flex-col items-center justify-center px-10 h-36 border mx-5">
              <p className="text-3xl">Total</p>
              <p className="text-5xl font-bold">{orderOpened.total}</p>
            </div>

            <div className="text-center flex flex-col items-center pt-3 px-10 h-24 border mx-5 mt-5">
              <p className="text-xl">Pagamento</p>
              <p className="text-md">
                Cartão final {orderOpened.payment.cardNumber.slice(15, 19)}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default index;
