import React, { useMemo, useState } from "react";
import Card from "../Card";
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

  const newOrder = store.getNewOrder();

  const [step, setStep] = useState(1);

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

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className={step === 1 ? "font-bold" : ""} onClick={() => setStep(1)}>
          Passo 1 - Nome do cliente
        </p>
        <p>&gt;</p>
        <p className={step === 2 ? "font-bold" : ""} onClick={() => setStep(2)}>
          Passo 2 - Escolha da comida
        </p>
        <p>&gt;</p>
        <p className={step === 3 ? "font-bold" : ""} onClick={() => setStep(3)}>
          Passo 3 - Escolha da bebida
        </p>
      </div>

      {step === 1 && (
        <input
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
      <div
        onClick={() => {
          if (step < 3) return setStep(step + 1);
          store.addNewOrder(newOrder);
          store.setNewOrder(orderInitialState);
          closeModal();
        }}
        className="mx-auto py-5 px-10 bg-black rounded-xl text-white hover:bg-primary hover:cursor-pointer"
      >
        <button>{step < 3 ? "Próximo" : "Gerar pedido"}</button>
      </div>
    </div>
  );
});

export default index;
