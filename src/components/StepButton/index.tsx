import { observer } from "mobx-react-lite";
import React from "react";
import { orderInitialState, useStore } from "src/stores";

const index = observer(() => {
  const store = useStore();
  const newOrder = store.getNewOrder();
  const step = store.getStep();

  const isNextStepDisabled =
    (step === 1 && newOrder.customerName.length === 0) ||
    (step === 3 && newOrder.orderedItems.length === 0);

  return (
    <button
      disabled={isNextStepDisabled}
      onClick={() => {
        if (step < 3) return store.setStep(step + 1);
        store.addNewOrder(newOrder);
        store.setNewOrder(orderInitialState);
        store.toggleModal();
      }}
      className="ml-auto py-2 px-10 bg-black rounded-md text-white hover:bg-primary hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-default transition"
    >
      {step < 3 ? "Próximo" : "Gerar pedido"}
    </button>
  );
});

export default index;
