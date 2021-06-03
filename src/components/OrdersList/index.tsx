import React from "react";
import { useStore } from "src/stores";
import DataRow from "../DataRow";
import ProductCard from "../ProductCard";
import Modal from "../Modal";
import { observer } from "mobx-react-lite";
import styles from "./OrdersList.module.scss";

const OrdersList = observer(() => {
  const store = useStore();
  const ordersToDisplay = [...store.getDisplayedOrders()].sort(
    (a, b) => b.id - a.id
  );
  const orders = store.getOrders();
  const orderOpened = store.getOrderOpened();

  const lastFourDigits = orderOpened.payment.cardNumber.slice(15, 19);

  const haveOrdersToDisplay = ordersToDisplay.length > 0;
  const haveOrders = orders.length > 0;

  const message =
    haveOrders && !haveOrdersToDisplay
      ? "Não há pedidos para esta pesquisa"
      : "Não há pedidos";

  return (
    <div>
      {haveOrdersToDisplay && (
        <ul>
          {ordersToDisplay.map((order, key) => (
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
      {!haveOrdersToDisplay && (
        <div className={styles.noData}>
          <p>{message}</p>
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
