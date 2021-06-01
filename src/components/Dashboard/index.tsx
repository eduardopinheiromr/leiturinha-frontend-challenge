import React from "react";
import SideBar from "../SideBar";
import Orders from "../Orders";
import styles from "./Dashboard.module.scss";

export default function index() {
  const { root } = styles;
  return (
    <div className={root}>
      <SideBar />
      <Orders />
    </div>
  );
}
