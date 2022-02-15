import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="secondary" variant="ligth">
        <Container>
          <Nav>
            <Link className="link" to="/">
              Ana Sayfa
            </Link>
          </Nav>
          <Nav>
            <Button
              variant="warning"
              className="nav-btn"
              onClick={() => navigate("/adminlogin")}
            >
              Yönetici Girişi
            </Button>
            <Button
              variant="warning"
              className="nav-btn"
              onClick={() => navigate("/userlogin")}
            >
              Kullanıcı Girişi
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
