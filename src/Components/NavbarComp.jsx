import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLinkItem from "./NavLinkItem";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-bootstrap";

const NavbarComp = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));
  // const [token, setToken] = useState("");
  // const [role, setRole] = useState("");

  // const saveToken = (accessToken, userRole) => {
  //   setToken(accessToken);
  //   setRole(userRole);
  // };
  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("idUser");
    navigate("/");
  };
  // useEffect(() => {
  //   const findToken = JSON.parse(sessionStorage.getItem("token"));
  //   const findRole = JSON.parse(sessionStorage.getItem("role"));
  //   setToken(findToken);
  //   setRole(findRole);
  // }, []);
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
  })
  return (
    <Navbar expand="lg" className="bg-black fixed-top ">
      <Container fluid>
        <Navbar.Brand>
          {" "}
          <img
            className="img-fluid "
            style={{ width: "150px" }}
            src="/img/tukson.png"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {token && role === "user" ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLinkItem to={"/"} name={"Inicio"} />

              <NavLinkItem to={"/productos"} name={"Productos"} />
              <NavLinkItem
                to="/cart"
                name={<i className="bi bi-cart-fill"></i>}
              />
            </Nav>

            <Nav>
              <div className="me-5">
                <NavLinkItem to="/myAccount" name={<>Mi cuenta <i className="bi bi-person"> </i></>}  />
              
                <button
                  onClick={logOut}
                  className="bg-black mx-4 navbarLink button_slide slide_down"
                >
                  <i className="bi bi-door-open-fill"></i> Cerrar Sesión
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        ) : token && role === "admin" ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLinkItem to={"/admin"} name={"Inicio"} />

              <NavLinkItem to={"/productos"} name={"Productos"} />
            </Nav>
           <Nav>
           <button
                  onClick={logOut}
                  className="bg-black mx-4 navbarLink button_slide slide_down"
                >
                  <i className="bi bi-door-open-fill"></i> Cerrar Sesión
                </button>
           </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLinkItem to={"/"} name={"Inicio"} />

              <NavLinkItem to={"/productos"} name={"Productos"} />
            </Nav>
            <Nav>
              <div className="me-5">
                <ModalLogin  />
              </div>
              <ModalRegister />
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
