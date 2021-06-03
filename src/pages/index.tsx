import { observer } from "mobx-react-lite";
import { useStore } from "src/stores";
import NewOrderButton from "../components/NewOrderButton/index";

const Home = () => {
  return (
    <div>
      <h1>Ahô</h1>
      <NewOrderButton />
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
