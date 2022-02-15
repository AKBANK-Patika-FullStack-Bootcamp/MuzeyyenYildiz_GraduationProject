import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import toastr from "toastr";

const EditUser = ({ data, refreshTable }) => {
  const [name, setName] = useState(data.name);
  const [lastName, setLastName] = useState(data.lastName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [tcNumber, setTcNo] = useState(data.tcNumber);
  const [plateNumber, setPlateNumber] = useState(data.plateNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    const tenantData = {
      name,
      lastName,
      phoneNumber,
      tcNumber,
      plateNumber,
    };

    let isTenantDataChanged = false;
    Object.keys(tenantData).forEach((key) => {
      if (tenantData[key] !== data[key]) {
        isTenantDataChanged = true;
      }
    });

    if (isTenantDataChanged) {
      tenantData.id = data.id;
      tenantData.userType = data.userType;
      tenantData.paymentId = data.paymentId;
      tenantData.userLoginId = data.userLoginId;
      tenantData.adminLoginId = data.adminLoginId;
      // axiout put paymentData

      axios
        .put(`http://localhost:5083/Tenants/${data.id}`, tenantData)
        .then((results) => {
          const {
            data: { status, message = "" },
          } = results;
          if (status === 1) {
            toastr.success(message, "Success");
            refreshTable();
          }
        });
    } else {
      toastr.warning("No changes to save!", "Warning");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>İsim</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Soyisim</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefon numarası</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            placeholder="5555555555"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>TC Kimlik numarası </Form.Label>
          <Form.Control
            type="text"
            value={tcNumber}
            placeholder="5555555555"
            onChange={(e) => setTcNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Plaka Numarasi </Form.Label>
          <Form.Control
            type="text"
            value={plateNumber}
            placeholder="AA-AA-AA"
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

export default EditUser;
