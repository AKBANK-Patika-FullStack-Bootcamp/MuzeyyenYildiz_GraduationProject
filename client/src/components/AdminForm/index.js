import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import toastr from "toastr";

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toastr.warning("Email alanı boş bırakılamaz", "Bilgi");
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toastr.warning("Geçersiz email adresi", "Bilgi");
      return;
    }

    if (!password) {
      toastr.warning("Şifre alanı boş bırakılamaz", "Bilgi");
      return;
    } else if (password.length < 6) {
      toastr.warning("Şifre en az 6 karakter olmalıdır", "Bilgi");
      return;
    }

    navigate("/users");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            onChange={handleEmail}
            autoComplete="off"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={handlePassword}
            autoComplete="off"
          />
        </div>
        <button className="btn btn-warning">Giriş yap</button>
      </form>
    </div>
  );
};

export default AdminForm;
