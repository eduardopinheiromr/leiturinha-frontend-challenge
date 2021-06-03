import React from "react";
import { creditCardFlag } from "src/utils";
import InputMask from "react-input-mask";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

const index = observer(() => {
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
    <div className="space-y-16">
      <div className="w-80 md:w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          style={{ filter: "sepia(100%) brightness(40%)" }}
          src="/assets/images/cardBg.png"
        />
        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div>
              <p className="font-light">Nome</p>
              <input
                className="font-medium tracking-widest bg-transparent"
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
              <img className="w-14 h-14" src={flagUrl} />
            ) : (
              <div className="w-14 h-14" />
            )}
          </div>
          <div className="pt-1">
            <p className="font-light">Número do cartão</p>
            <InputMask
              mask="9999 9999 9999 9999"
              className="font-medium tracking-widest bg-transparent w-56"
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
                  className="font-medium tracking-widest bg-transparent w-14"
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
                <p className="font-light text-xs">CVC</p>
                <input
                  className="font-medium tracking-widest bg-transparent w-14"
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

export default index;
