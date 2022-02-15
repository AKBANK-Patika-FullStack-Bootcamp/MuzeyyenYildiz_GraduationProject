import React from "react";
import UserTable from "../UserTable";
import "./style.css";
import { useGetData } from "../../hooks/useGetData";

const UserList = () => {
  const [data, refreshTable] = useGetData();

  const filteredDataA = () => {
    return data.filter((data) => data.blok === "A");
  };

  const filteredDataB = () => {
    return data.filter((data) => data.blok === "B");
  };
  const AblokData = filteredDataA();
  const BblokData = filteredDataB();

  return (
    <div className="list-container">
      <h2>
        <strong>A Blok</strong>
      </h2>
      <UserTable data={AblokData} refreshTable={() => refreshTable()} />
      <h2>
        <strong>B Blok</strong>
      </h2>
      <UserTable data={BblokData} refreshTable={() => refreshTable()} />
    </div>
  );
};

export default UserList;
