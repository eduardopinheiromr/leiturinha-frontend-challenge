import React from "react";
import SideBar from "../SideBar";
import Orders from "../Orders";
import Billing from "../Billing";
import styles from "./Dashboard.module.scss";
import { useStore } from "src/stores";
import { observer } from "mobx-react-lite";

const Dashboard = observer(() => {
  const { root } = styles;
  const store = useStore();

  const module = store.getModule();
  return (
    <div className={root}>
      <SideBar />
      {module === "orders" && <Orders />}
      {module === "billing" && <Billing />}
    </div>
  );
});

export default Dashboard;
