import React from "react";
import styles from "./Modal.module.scss";
import { orderInitialState, useStore } from "src/stores";
import { observer } from "mobx-react-lite";

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  confirm: JSX.Element;
};

const index = observer(({ children, confirm, title }: Props) => {
  const store = useStore();

  const open = store.getModal();

  const handleClose = () => {
    store.toggleModal(false);
    store.setNewOrder(orderInitialState);
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

            <div className={styles.modalBackground}>
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
