import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserPayment from "./pages/UserPayment";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userpayment" element={<UserPayment />} />
      </Routes>
    </div>
  );
}

export default App;
