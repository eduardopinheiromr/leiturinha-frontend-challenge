import React from "react";
import { creditCardFlag } from "src/utils";
import InputMask from "react-input-mask";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";
import styles from "./CreditCard.module.scss";

const CreditCard = observer(() => {
  const { root, creditCardContainer, flagStyle } = styles;
  const store = useStore();
  const newOrder = store.getNewOrder();
  const cardFlag = creditCardFlag(newOrder.payment.cardNumber);
  const flagUrl =
    cardFlag === "MASTER"
      ? "/assets/images/master.png"
      : cardFlag === "VISA"
      ? "/assets/images/visa.png"
      : "";

  return (
    <div className={root}>
      <div className={creditCardContainer}>
        <img src="/assets/images/cardBg.png" />
        <div>
          <div>
            <div>
              <p>Nome</p>
              <input
                placeholder="Digite o nome..."
                value={newOrder.payment.name}
                onChange={event =>
                  store.setNewOrder({
                    ...newOrder,
                    payment: {
                      ...newOrder.payment,
                      name: event.currentTarget.value,
                    },
                  })
                }
              />
            </div>
            {flagUrl ? (
              <img className={flagStyle} src={flagUrl} />
            ) : (
              <div className={flagStyle} />
            )}
          </div>
          <div className="pt-1">
            <p>Número do cartão</p>
            <InputMask
              mask="9999 9999 9999 9999"
              className="w-56"
              placeholder="0000 0000 0000 0000"
              value={newOrder.payment.cardNumber}
              onChange={event =>
                store.setNewOrder({
                  ...newOrder,
                  payment: {
                    ...newOrder.payment,
                    cardNumber: event.currentTarget.value,
                  },
                })
              }
            />
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Validade</p>
                <InputMask
                  mask="99/99"
                  className="w-14"
                  placeholder="04/28"
                  value={newOrder.payment.goodThru}
                  onChange={event =>
                    store.setNewOrder({
                      ...newOrder,
                      payment: {
                        ...newOrder.payment,
                        goodThru: event.currentTarget.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <p className="text-xs">CVC</p>
                <input
                  className="w-14"
                  maxLength={3}
                  placeholder="787"
                  value={newOrder.payment.cvv}
                  onChange={event =>
                    store.setNewOrder({
                      ...newOrder,
                      payment: {
                        ...newOrder.payment,
                        cvv: event.currentTarget.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreditCard;
