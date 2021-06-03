import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import StepChip from "../StepChip";
import Payment from "../Payment";
import { useStore } from "src/stores";
import styles from "./OrderFlow.module.scss";
import { observer } from "mobx-react-lite";

const index = observer(() => {
  const { wrapper } = styles;
  const store = useStore();
  const step = store.getStep();

  const newOrder = store.getNewOrder();

  const food = store
    .getProducts()
    .filter(product => product.category === "food");
  const drink = store
    .getProducts()
    .filter(product => product.category === "drink");

  const foodCards = useMemo(
    () => food.map((food, key) => <ProductCard key={key} product={food} />),
    [food]
  );
  const drinkCards = useMemo(
    () => drink.map((drink, key) => <ProductCard key={key} product={drink} />),
    [drink]
  );

  const handleNextStep = (key?: string) => {
    if (key === "Enter") {
      store.setStep(step + 1);
      return;
    }
  };

  const steps = [
    { label: "Nome do cliente", step: 1 },
    { label: "Escolha da comida", step: 2 },
    { label: "Escolha da bebida", step: 3 },
    { label: "Pagamento", step: 4 },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-auto flex-col md:flex-row md:mx-0">
        {steps.map((current, key) => (
          <StepChip
            key={key}
            position={current.step}
            step={step}
            onClick={() => store.setStep(current.step)}
            label={current.label}
          />
        ))}
      </div>

      {step === 1 && (
        <input
          autoFocus
          type="text"
          className="my-10 p-5 mx-auto w-72"
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
          <div className={wrapper}>{foodCards}</div>
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

export default index;
