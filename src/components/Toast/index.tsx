import { observer } from "mobx-react-lite";
import { useStore } from "src/stores";

const Toast = observer(() => {
  const store = useStore();

  const toast = store.getToast();

  if (toast) {
    setTimeout(() => {
      store.toggleToast();
    }, 4000);
  }
  return (
    <>
      {toast && (
        <div
          className="absolute flex items-center bg-black border-l-4 border-green-500 py-2 px-3 mb-2"
          style={{ right: 25, top: 25, boxShadow: "0 5px 20px black" }}
        >
          {/* icons */}
          <div className="text-green-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className="bi bi-check"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          </div>
          {/* message */}
          <div className="text-white max-w-xs ">
            Pedido efetuado com sucesso!
          </div>
        </div>
      )}
    </>
  );
});

export default Toast;
