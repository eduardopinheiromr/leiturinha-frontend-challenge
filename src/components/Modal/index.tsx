import React from "react";
import styles from "./Modal.module.scss";
import { orderInitialState, useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { ModalContext } from "src/stores/types";

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  context: ModalContext;
  confirm?: JSX.Element;
  size?: "md" | "lg";
};

const index = observer(({ children, confirm, title, context, size }: Props) => {
  const store = useStore();

  const open = store.getModal(context);

  const handleClose = () => {
    store.toggleModal(context, false);
    store.setNewOrder(orderInitialState);
    store.setStep(1);
  };

  return (
    <>
      {open && (
        <div
          className={styles.root}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.container}>
            <div className={styles.background} aria-hidden="true" />
            <span className={styles.centralize} aria-hidden="true" />

            <div
              className={`${styles.modalBackground} ${
                size === "md" ? styles.modalMd : styles.modalLg
              }`}
            >
              <div className={styles.title}>{title}</div>
              <div className={styles.content}>{children}</div>
              <div className="bg-white">
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.cancel}
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  {confirm}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default index;
