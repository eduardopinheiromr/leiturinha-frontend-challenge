import { observer } from "mobx-react-lite";
import React from "react";
import { orderInitialState, useStore } from "src/stores";
import { checkFields } from "src/utils";

const index = observer(() => {
  const store = useStore();
  const newOrder = store.getNewOrder();
  const step = store.getStep();

  const isLastStep = step === 4;

  const isNextStepDisabled =
    (step === 1 && newOrder.customerName.length === 0) ||
    (step > 1 && !isLastStep && newOrder.orderedItems.length === 0) ||
    (isLastStep &&
      (!checkFields(newOrder.payment) ||
        newOrder.customerName.length === 0 ||
        newOrder.orderedItems.length === 0));

  const handleNextStep = () => {
    if (!isLastStep) return store.setStep(step + 1);
    store.addNewOrder(newOrder);
    store.setNewOrder(orderInitialState);
    store.setStep(1);
    store.toggleModal(false);
  };
  return (
    <button
      disabled={isNextStepDisabled}
      onClick={() => handleNextStep()}
      className="ml-auto py-2 px-10 bg-black rounded-md text-white hover:bg-primary hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-default transition"
    >
      {isLastStep ? "Gerar pedido" : "Próximo"}
    </button>
  );
});

export default index;
