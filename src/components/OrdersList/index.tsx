import React from "react";
import { useStore } from "src/stores";
import DataRow from "../DataRow";
import ProductCard from "../ProductCard";
import Modal from "../Modal";
import { observer } from "mobx-react-lite";
import styles from "./OrdersList.module.scss";

const OrdersList = observer(() => {
  const store = useStore();
  const orders = [...store.getOrders()].sort((a, b) => b.id - a.id);

  const orderOpened = store.getOrderOpened();

  const lastFourDigits = orderOpened.payment.cardNumber.slice(15, 19);

  const haveOrders = orders.length > 0;
  return (
    <div>
      {haveOrders && (
        <ul>
          {orders.map((order, key) => (
            <DataRow
              key={key}
              order={order}
              onClick={() => {
                store.toggleModal("openOrder", true);
                store.setOrderOpened(order);
              }}
            />
          ))}
        </ul>
      )}
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
        <div className={styles.modalRoot}>
          <div>
            <ul>
              {orderOpened.orderedItems.map((product, key) => (
                <li className="mb-10" key={key}>
                  <ProductCard product={product} readOnly />
                </li>
              ))}
            </ul>
            <div className={styles.billingInfo}>
              <div>
                <p>Total</p>
                <p>{orderOpened.total}</p>
              </div>

              <div>
                <p>Pagamento</p>
                <p>Cartão final {lastFourDigits}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default OrdersList;
