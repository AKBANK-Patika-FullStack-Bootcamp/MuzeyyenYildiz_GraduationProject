import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";
import CreditCardApp from "./creditCardApp";
import "./style.css";
import img from "./aidat.jpg";

const hunel = new HunelCreditCard({
  middlePartHide: true, //set true to mask credit card number on the card
});

const PaymentForm = () => {
  const [show, setShow] = useState(false);
  const [activePayment, setActivePayment] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (payment) => {
    setShow(true);
    setActivePayment(payment);
  };

  const userData = useSelector((state) => state.userData.value);

  return (
    <div className="form">
      <div className="form-header">
        <h1>
          {userData.name} {userData.lastName} Hoşgeldiniz!
        </h1>
      </div>
      <div className="form-cont">
        <img src={img} />
        <Table striped bordered>
          <thead>
            <tr>
              <th>Blok</th>
              <th>Kat</th>
              <th>Daire no</th>
              <th>İsim</th>
              <th>Soyisim</th>
              <th>Aidat </th>
              <th>Elektrik</th>
              <th>Gaz</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.blok} Blok</td>
              <td>
                {userData.floor === 0 ? "Zemin Kat" : `${userData.floor} Kat`}
              </td>
              <td>No {userData.number}</td>
              <td>{userData.name}</td>
              <td>{userData.lastName}</td>
              <td>{userData.dues} TL</td>
              <td>{userData.electricityBill} TL</td>
              <td>{userData.gasBill} TL</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {userData.dues > 0 ? (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShow(userData.dues)}
                  >
                    Öde
                  </Button>
                ) : null}
              </td>
              <td>
                {userData.electricityBill > 0 ? (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShow(userData.electricityBill)}
                  >
                    Öde
                  </Button>
                ) : null}
              </td>
              <td>
                {userData.gasBill > 0 ? (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShow(userData.gasBill)}
                  >
                    Öde
                  </Button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </Table>

        <Modal
          size="xl"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ödeme Sayfası</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HunelProvider config={hunel}>
              <CreditCardApp data={activePayment} />
            </HunelProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentForm;
