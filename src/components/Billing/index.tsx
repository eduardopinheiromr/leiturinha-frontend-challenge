import React from "react";
import Header from "../Header";
import Chart from "../Chart";
import styles from "./Billing.module.scss";
import { useStore } from "src/stores";
import { transformNumberIntoBRL } from "src/utils";
import { observer } from "mobx-react-lite";
import { Result } from "src/stores/types";

const index = observer(() => {
  const { root } = styles;

  const store = useStore();

  const orders = store.getOrders();

  const total =
    orders.length > 0
      ? transformNumberIntoBRL(
          orders
            .map(order =>
              Number(order.total.replace("R$", "").replace(",", "."))
            )
            .reduce((total, current) => total + current)
        )
      : 0;

  const rawProducts = orders
    .map(order => {
      const products: {
        name: string;
        quantity: number;
        total: number;
        category: string;
      }[] = [];

      order.orderedItems.forEach(ordered => {
        const { name, quantity, price, category } = ordered;
        const total = price * quantity;
        products.push({ name, quantity, total, category });
      });

      return products;
    })
    .flat();

  const productsRanking = rawProducts
    .reduce((accumulator: Result[], cur: Result) => {
      const name = cur.name,
        found = accumulator.find((elem: Result) => {
          return elem.name == name;
        });

      if (found) found.quantity += cur.quantity;
      else accumulator.push(cur);
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
      <div className="text-center rounded-xl p-5 w-80 mx-auto shadow-2xl hover:transform hover:scale-105 transition delay-50">
        <p className="text-xl">Total faturado até o momento </p>
        <p className="text-6xl font-bold">{total}</p>
      </div>
      {orders.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-80 md:w-2/4 text-center my-12">
              <h3 className="text-3xl font-bold">Comidas</h3>
              <Chart products={foods} />
            </div>
            <div className="w-80 md:w-2/4 text-center">
              <h3 className="text-3xl font-bold">Bebidas</h3>
              <Chart products={drinks} />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default index;
