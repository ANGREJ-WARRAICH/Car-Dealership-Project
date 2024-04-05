import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/images/logo.png";
import AuthCheck from "../AuthCheck/AuthCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Header = (props) => {
  const { auth } = props;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout");
      if (response.status === 200) toast.success(response.data.message);
      Cookies.remove("token");
      Cookies.remove("type");
      Cookies.remove("user_Id");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar_bg">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img src={logo} alt="Logo" height={50} width={130} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {auth && (
                <Nav.Item
                className="cursor_button"
                onClick={() => navigate("/pendingcars")}
                >
                  Car Request
                </Nav.Item>
              )}
              <Nav.Item className="mx-lg-3">{auth ? "Admin" : "Salesperson"}</Nav.Item>
              <Nav.Item
                className="cursor_button"
                onClick={() => handleLogout()}
              >
                Logout
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AuthCheck({ Component: Header });
