import React from "react";
import DataRow from "../DataRow";

export default function index() {
  const test = [
    {
      id: 10,
      category: "food",
      name: "Comida",
      description: "Descrição de comida",
      price: 10,
    },
    {
      id: 10,
      category: "food",
      name: "Comida",
      description: "Descrição de comida",
      price: 10,
    },
    {
      id: 10,
      category: "food",
      name: "Comida",
      description: "Descrição de comida",
      price: 10,
    },
  ];
  return (
    <div>
      {test.map((order, key) => (
        <DataRow key={key} id={1} product={order} />
      ))}
    </div>
  );
}
