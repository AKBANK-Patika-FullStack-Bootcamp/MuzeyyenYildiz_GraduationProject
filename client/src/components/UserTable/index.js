import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import EditUser from "./EditUser";
import "./style.css";

const UserTable = ({ data, refreshTable }) => {
  const [show, setShow] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (row) => {
    setActiveRow(row);
    setShow(true);
  };

  return (
    <div className="card-container">
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>Id</th>
            <th>Blok</th>
            <th>Kat</th>
            <th>Daire no</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Telefon Numarası</th>
            <th>Aidat</th>
            <th>Elektrik Faturası</th>
            <th>Dogalgaz Faturası</th>
            <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.blok} Blok</td>
              <td>{data.floor === 0 ? "Zemin Kat" : `${data.floor} Kat`}</td>
              <td>No {data.number}</td>
              <td>{data.name}</td>
              <td>{data.lastName}</td>
              <td>0{data.phoneNumber}</td>
              <td>{data.duesPayed === true ? "Ödendi" : "Ödenmedi"}</td>
              <td>
                {data.electricityBillPayed === true ? "Ödendi" : "Ödenmedi"}
              </td>
              <td>{data.gasBillPayed === true ? "Ödendi" : "Ödenmedi"}</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShow(data)}
                >
                  Düzenle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Body>
          <EditUser data={activeRow} refreshTable={refreshTable} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
