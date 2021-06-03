import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import StepChip from "../StepChip";
import Payment from "../Payment";
import { useStore } from "src/stores";
import styles from "./OrderFlow.module.scss";
import { observer } from "mobx-react-lite";

const OrderFlow = observer(() => {
  const { root, wrapper } = styles;
  const store = useStore();
  const step = store.getStep();

  const newOrder = store.getNewOrder();

  const products = store.getProducts();

  const food = products.filter(product => product.category === "food");
  const drink = products.filter(product => product.category === "drink");

  const foodCards = useMemo(
    () =>
      food.map((food, key) => (
        <li key={key}>
          <ProductCard product={food} />
        </li>
      )),
    [food]
  );

  const drinkCards = useMemo(
    () =>
      drink.map((drink, key) => (
        <li key={key}>
          <ProductCard product={drink} />
        </li>
      )),
    [drink]
  );

  const handleNextStep = (key?: string) => {
    if (key === "Enter") {
      store.setStep(step + 1);
    }
  };

  const steps = [
    { label: "Nome do cliente", step: 1 },
    { label: "Escolha da comida", step: 2 },
    { label: "Escolha da bebida", step: 3 },
    { label: "Pagamento", step: 4 },
  ];

  return (
    <div className={root}>
      <nav>
        {steps.map((current, key) => (
          <StepChip
            key={key}
            position={current.step}
            step={step}
            onClick={() => store.setStep(current.step)}
            label={current.label}
          />
        ))}
      </nav>

      {step === 1 && (
        <input
          autoFocus
          type="text"
          placeholder="Digite o nome do cliente"
          value={newOrder.customerName}
          onChange={event =>
            store.setNewOrder({
              ...newOrder,
              customerName: event.currentTarget.value,
            })
          }
          onKeyUp={event => handleNextStep(event.key)}
        />
      )}
      {step === 2 && (
        <div>
          <ul className={wrapper}>{foodCards}</ul>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className={wrapper}>{drinkCards}</div>
        </div>
      )}
      {step === 4 && <Payment />}
    </div>
  );
});

export default OrderFlow;
