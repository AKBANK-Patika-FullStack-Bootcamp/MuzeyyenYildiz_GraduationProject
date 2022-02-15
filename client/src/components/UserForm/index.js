import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/userData";
import toastr from "toastr";

const UserForm = () => {
  const [blok, setBlok] = useState("Blok Adı");
  const [number, setNumber] = useState(0);
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();

  const [data] = useGetData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blok === "Blok Adı" && number === 0) {
      toastr.warning("Lütfen Boş Alanları Doldurunuz", "Bilgi");
    } else {
      const filteredData = data.find(
        (data) => data.blok === blok && data.number === number
      );
      if (filteredData.length === 0) {
        toastr.warning("Böyle Bir Ev Bulunamadı", "Bilgi");
      } else {
        toastr.warning("Böyle Bir Ev Bulundu", "Bilgi");
      }
      dispatch(setUserData(filteredData));
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select">Blok Adı</Form.Label>
            <Form.Select id="Select" onChange={(e) => setBlok(e.target.value)}>
              <option selected>Blok Adı </option>
              <option value="A">A </option>
              <option value="B">B </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select">Daire No</Form.Label>
            <Form.Select
              id="Select"
              onChange={(e) => setNumber(Number(e.target.value))}
            >
              <option selected>Daire No </option>
              {[...Array(16).keys()]
                .filter((item) => item)
                .map((number) => {
                  return (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button type="submit">Seç</Button>
        </fieldset>
      </Form>
      {userData ? (
        <>
          <div className="payment-container">
            Hoş Geldiniz{" "}
            <strong>
              {userData.name} {userData.lastName}
            </strong>
          </div>
          <Link to="/userpayment" className="btn btn-warning">
            Ödeme Sayfasına Git
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default UserForm;
