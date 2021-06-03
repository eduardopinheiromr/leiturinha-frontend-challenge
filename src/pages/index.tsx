import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/stores";

const Home = () => {
  return (
    <div>
      <h1>Ahô</h1>
      <ProductList />
    </div>
  );
};

const ProductList = observer(() => {
  const store = useStore();

  return (
    <ul>
      {store.products.map((product, key) => (
        <li key={key}>{product.name}</li>
      ))}
    </ul>
  );
});

export default Home;
