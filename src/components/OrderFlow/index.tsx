import React, { useMemo, useState } from "react";
import Card from "../Card";
import StepChip from "../StepChip";
import { useStore } from "src/stores";
import styles from "./OrderFlow.module.scss";
import { observer } from "mobx-react-lite";
import { orderInitialState } from "../../stores/index";

type Props = {
  closeModal: () => void;
};

const index = observer(({ closeModal }: Props) => {
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
    () => food.map((food, key) => <Card key={key} product={food} />),
    [food]
  );
  const drinkCards = useMemo(
    () => drink.map((drink, key) => <Card key={key} product={drink} />),
    [drink]
  );

  const handleNextStep = (key?: string) => {
    if (key === "Enter") {
      store.setStep(step + 1);
      return;
    }
  };

  console.log(newOrder.customerName.length === 0);

  const steps = [
    { label: "Nome do cliente", step: 1 },
    { label: "Escolha da comida", step: 2 },
    { label: "Escolha da bebida", step: 3 },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
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
      {/* <button
        disabled={isNextStepDisabled}
        onClick={() => {
          if (step < 3) return setStep(step + 1);
          store.addNewOrder(newOrder);
          store.setNewOrder(orderInitialState);
          closeModal();
        }}
        className="mx-auto py-5 px-10 bg-black rounded-xl text-white hover:bg-primary hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-default transition"
      >
        {step < 3 ? "Próximo" : "Gerar pedido"}
      </button> */}
    </div>
  );
});

export default index;
