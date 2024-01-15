import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Formik } from "formik";
import clienteAxios from "../utils/axios";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MiCuentaComp from "../Components/MiCuentaComp";
const MiCuenta = () => {
  const [validated, setValidated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const obtenerUsuario = async () => {
    try {
      const resUser = await clienteAxios.get(`/user/${idUser}`);
      setUserInfo(resUser.data.getUser);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };
  useEffect(() => {
    obtenerUsuario()
  },[])
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav className="flex-column ">
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  className="text-white mx-4 navbarLink button_slide slide_down"
                >
                  Datos Personales
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className="text-white mx-4 navbarLink button_slide slide_down"
                >
                  Formas de pago
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="third"
                  className="text-white mx-4 navbarLink button_slide slide_down"
                >
                  Reestablecer contraseña
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="text-white">
            <Tab.Content>
              <Tab.Pane eventKey="first">
              {Object.keys(userInfo).length > 0 ? (
                  <MiCuentaComp userInfo={userInfo} />
                ) : (
                  // Muestra un indicador de carga u otro contenido mientras se carga userInfo
                  <p>Cargando información del usuario...</p>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
              <Tab.Pane eventKey="third">3 tab content</Tab.Pane>
              <Tab.Pane eventKey="fourt">4 tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default MiCuenta;
