import React from "react";
import Header from "../Header";
import Chart from "../Chart";
import styles from "./Billing.module.scss";
import { useStore } from "src/stores";
import { transformNumberIntoBRL } from "src/utils";
import { observer } from "mobx-react-lite";
import { BillingProduct, Result } from "src/stores/types";

const index = observer(() => {
  const { root, totalContainer, charts, chart } = styles;

  const store = useStore();
  const orders = store.getOrders();

  const orderIsEmpty = orders.length > 0;
  const total = orderIsEmpty
    ? transformNumberIntoBRL(
        orders
          .map(order => Number(order.total.replace("R$", "").replace(",", ".")))
          .reduce((total, current) => total + current)
      )
    : 0;

  const rawProducts = orders
    .map(order => {
      const products: BillingProduct[] = [];

      order.orderedItems.forEach(ordered => {
        const { name, quantity, price, category } = ordered;
        const total = price * quantity;
        products.push({ name, quantity, total, category });
      });

      return products;
    })
    .flat();

  const productsRanking = rawProducts
    .reduce((accumulator: Result[], current: Result) => {
      const name = current.name,
        found = accumulator.find((element: Result) => {
          return element.name == name;
        });

      if (found) found.quantity += current.quantity;
      else accumulator.push(current);
      return accumulator;
    }, [])
    .sort((a, b) => b.quantity - a.quantity);

  const foods = productsRanking.filter(product => product.category === "food");
  const drinks = productsRanking.filter(
    product => product.category === "drink"
  );

  return (
    <div className={root}>
      <Header title="Faturamento" />
      <div className={totalContainer}>
        <p>Total faturado até o momento </p>
        <p>{total}</p>
      </div>
      {orderIsEmpty && (
        <>
          <div className={charts}>
            <div>
              <h3>Comidas</h3>
              <Chart className={chart} products={foods} />
            </div>
            <div>
              <h3>Bebidas</h3>
              <Chart className={chart} products={drinks} />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default index;
