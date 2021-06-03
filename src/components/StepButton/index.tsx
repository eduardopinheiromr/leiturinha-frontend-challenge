import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { orderInitialState, useStore } from "src/stores";
import { checkFields } from "src/utils";
import styles from "./StepButton.module.scss";

const StepButton = observer(() => {
  const { root } = styles;
  const store = useStore();
  const newOrder = store.getNewOrder();
  const step = store.getStep();

  const [loading, setLoading] = useState(false);

  const isLastStep = step === 4;

  const isNextStepDisabled =
    (step === 1 && newOrder.customerName.length === 0) ||
    (step > 1 && !isLastStep && newOrder.orderedItems.length === 0) ||
    (isLastStep &&
      (!checkFields(newOrder.payment) ||
        newOrder.customerName.length === 0 ||
        newOrder.orderedItems.length === 0));

  const handleNextStep = async () => {
    if (!isLastStep) return store.setStep(step + 1);
    setLoading(true);
    await store.addNewOrder(newOrder);
    store.setNewOrder(orderInitialState);
    store.setStep(1);
    store.toggleModal("newOrder", false);
    store.toggleToast();
    setLoading(false);
  };

  return (
    <button
      disabled={isNextStepDisabled || loading}
      onClick={() => handleNextStep()}
      className={root}
    >
      {loading ? <LoadingSpinner /> : isLastStep ? "Gerar pedido" : "Próximo"}
    </button>
  );
});

export default StepButton;

const LoadingSpinner = () => (
  <div className="animate-spin">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="currentColor"
      className="bi bi-arrow-repeat"
      viewBox="0 0 16 16"
    >
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
      <path
        fillRule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
      />
    </svg>
  </div>
);
