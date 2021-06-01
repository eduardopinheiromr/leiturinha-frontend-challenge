// import { observer } from "mobx-react-lite";
// import { useStore } from "src/stores";
import Dashboard from "../components/Dashboard";

const Home = () => {
  return <Dashboard />;
};

// const ProductList = observer(() => {
//   const store = useStore();

//   return (
//     <ul>
//       {store.products.map((product, key) => (
//         <li key={key}>{product.name}</li>
//       ))}
//     </ul>
//   );
// });

export default Home;
