import React from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose: () => void;
  title: string;
  confirm: JSX.Element;
};

export default function index({
  children,
  open,
  onClose,
  confirm,
  title,
}: Props) {
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
                    onClick={onClose}
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
}
