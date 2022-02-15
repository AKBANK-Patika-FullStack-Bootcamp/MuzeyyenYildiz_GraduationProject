import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-app">
      <div className="home-container">
        <h1 className="ani">Hoş Geldiniz!</h1>
        <h4>Yönetici girişi için </h4>
        <Button
          variant="warning"
          className="nav-btn"
          onClick={() => navigate("/adminlogin")}
        >
          Yönetici Girişi
        </Button>
        <h4>Aidat ve Fatura Ödemesi İçin </h4>

        <Button
          variant="warning"
          className="nav-btn"
          onClick={() => navigate("/userlogin")}
        >
          Kullanıcı Girişi
        </Button>
      </div>
    </div>
  );
};

export default Home;
