import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import clienteAxios from "../utils/axios";
import { Formik } from "formik";
import { errorAccountEdit } from "../helpers/validationSchemaErrors";

const MiCuentaComp = ({ userInfo }) => {
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
  const [validated, setValidated] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

 
  const editarUsuario = async (values) => {
    try {
      if (
        userInfo.city === values.city &&
        userInfo.zip === values.zip &&
        userInfo.domicile === values.domicile
      ) {
        return Swal.fire({
          title: "Que raro..",
          text: "Al parecer no realizaste ningún cambio",
          icon: "info",
        });
      }
      const resEditUser = await clienteAxios.put(`/user/${idUser}`, {
        city: values.city,
        zip: values.zip,
        domicile: values.domicile,
      });

      if (resEditUser.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Cambios Guardados!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        city: userInfo.city,
        zip: userInfo.zip,
        domicile: userInfo.domicile,
        numberPhone: userInfo.numberPhone,
      }}
      onSubmit={(values) => editarUsuario(values)}
      validationSchema={errorAccountEdit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="5"
              className="me-5"
              controlId="validationCustom01"
            >
              <Form.Label>Nombre y Apellido</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  defaultValue={userInfo.fullName}
                  disabled
                  type="text"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              md="5"
              className="me-5"
              controlId="validationCustom02"
            >
              <Form.Label>Correo Electrónico</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <i className="bi bi-envelope-at-fill"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  defaultValue={userInfo.email}
                  disabled
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="5"
              className="me-5"
              controlId="validationCustom03"
            >
              <Form.Label>Ciudad</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <i className="bi bi-geo-alt"></i>
                </InputGroup.Text>
                <Form.Select
                  aria-label="Default select example"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                >
                  <option>
                    {userInfo.city === ""
                      ? "Seleccione una opción"
                      : userInfo.city}
                  </option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Ciudad Autónoma de Buenos Aires">
                    Ciudad Autónoma de Buenos Aires
                  </option>
                  <option value="Catamarca">Catamarca</option>
                  <option value="Chaco">Chaco</option>
                  <option value="Chubut">Chubut</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Corrientes">Corrientes</option>
                  <option value="Entre Ríos">Entre Ríos</option>
                  <option value="Formosa">Formosa</option>
                  <option value="Jujuy">Jujuy</option>
                  <option value="La Pampa">La Pampa</option>
                  <option value="La Rioja">La Rioja</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Misiones">Misiones</option>
                  <option value="Neuquén">Neuquén</option>
                  <option value="Río Negro">Río Negro</option>
                  <option value="Salta">Salta</option>
                  <option value="San Juan">San Juan</option>
                  <option value="San Luis">San Luis</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Santiago del Estero">
                    Santiago del Estero
                  </option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucumán">Tucumán</option>
                </Form.Select>
              </InputGroup>
              <small className="text-danger">
                {" "}
                {errors.city && touched.city && errors.city}
              </small>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="validationCustom05">
              <Form.Label>Código Postal</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <i className="bi bi-geo-alt"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="zip"
                  value={values.zip}
                  placeholder={userInfo.zip === "" ? values.zip : userInfo.zip}
                />
              </InputGroup>
              <small className="text-danger">
                {" "}
                {errors.zip && touched.zip && errors.zip}
              </small>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="5"
              className="me-5"
              controlId="validationCustom05"
            >
              <Form.Label>Domicilio</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <i className="bi bi-pin-map"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={values.domicile}
                  name="domicile"
                  onChange={handleChange}
                />
              </InputGroup>
              <small className="text-danger">
                {" "}
                {errors.domicile && touched.domicile && errors.domicile}
              </small>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="validationCustom05">
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <>
                    <i className="bi bi-telephone"></i>
                  </>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={values.numberPhone}
                  disabled
                  name="numberPhone"
                  onChange={handleChange}
                  maxLength={13}
                />
              </InputGroup>

             
              <small className="text-danger">
                {" "}
                {errors.numberPhone &&
                  touched.numberPhone &&
                  errors.numberPhone}
              </small>
            </Form.Group>
          </Row>
          <Row>
            <button
              className=" w-50  mt-3 navbarLink button_slide_account slide_down_account "
              type="submit"
              onClick={handleSubmit}
            >
              Guardar Cambios
            </button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MiCuentaComp;
