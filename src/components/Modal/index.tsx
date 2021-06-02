import React from "react";
import styles from "./Modal.module.scss";

type Button = {
  label: string;
  onClick: () => void;
};

type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose: () => void;
  title: string;
  buttons: {
    confirm: Button;
    cancel: Button;
  };
};

export default function index({
  children,
  open,
  onClose,
  buttons,
  title,
}: Props) {
  const { cancel, confirm } = buttons;
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
                    onClick={cancel.onClick}
                  >
                    {cancel.label}
                  </button>
                  <button
                    type="button"
                    className={styles.confirm}
                    onClick={confirm.onClick}
                  >
                    {confirm.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
