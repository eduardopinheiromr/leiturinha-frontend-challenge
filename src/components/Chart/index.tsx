import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Result } from "src/stores/types";
import { transformNumberIntoBRL } from "src/utils";

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {},
};

type Props = {
  products: Result[];
};

export default function index({ products }: Props) {
  const data = {
    labels: products.map(
      product => `${product.name} ${transformNumberIntoBRL(product.total)}`
    ),
    datasets: [
      {
        label: "Número de produtos vendidos",
        data: products.map(product => product.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut type="bar" data={data} options={options} />;
}
