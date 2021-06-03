import React, { useEffect, useState } from "react";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

const SearchBar = observer(() => {
  const [query, setQuery] = useState("");

  const store = useStore();

  const orders = store.getOrders();

  useEffect(() => {
    const filteredOrders = orders.filter(
      order =>
        order.id === Number(query) ||
        order.customerName.toLowerCase().includes(query.toLowerCase())
    );

    store.displayFilteredOrders(filteredOrders);
  }, [query]);

  useEffect(() => {
    console.log("Orders mudou");
    setQuery("");
  }, [orders.length]);

  return (
    <div>
      <input
        type="text"
        placeholder="N# do pedido ou nome do cliente"
        className="w-64 p-1 mt-3 sm:mt-0 xl:p-3 xl:w-72 rounded-xl"
        value={query}
        onChange={event => setQuery(event.currentTarget.value)}
      />
    </div>
  );
});

export default SearchBar;
