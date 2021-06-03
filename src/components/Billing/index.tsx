import React from "react";
import Header from "../Header";
import styles from "./Billing.module.scss";
import { useStore } from "src/stores";
import { transformNumberIntoBRL } from "src/utils";
import { observer } from "mobx-react-lite";
import { Product } from "src/stores/types";

type Result = {
  name: string;
  quantity: number;
  total: number;
  category: string;
};

const index = observer(() => {
  const { root } = styles;

  const store = useStore();

  const orders = store.getOrders();

  const total = transformNumberIntoBRL(
    orders
      .map(order => Number(order.total.replace("R$", "").replace(",", ".")))
      .reduce((total, current) => total + current)
  );

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

  console.log(foods, drinks);

  return (
    <div className={root}>
      <Header title="Faturamento" />
      <p>Total faturado até o momento {total}</p>
      <h3 className="text-3xl font-bold my-5">Comidas</h3>
      {foods.map((product, key) => (
        <p key={key}>
          {product.name} - {product.quantity} -{" "}
          {transformNumberIntoBRL(product.total)}
        </p>
      ))}
      <h3 className="text-3xl font-bold my-5">Bebidas</h3>
      {drinks.map((product, key) => (
        <p key={key}>
          {product.name} - {product.quantity} -{" "}
          {transformNumberIntoBRL(product.total)}
        </p>
      ))}
    </div>
  );
});

export default index;
