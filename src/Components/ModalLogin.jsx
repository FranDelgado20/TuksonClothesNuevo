import { useState } from "react";
import Swal from "sweetalert2";
import InputGroup from "react-bootstrap/InputGroup";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { Formik } from "formik";
import { errorLogin } from "../helpers/validationSchemaErrors";
import clienteAxios, { config } from "../utils/axios";
import { Button } from "react-bootstrap";
const ModalLogin = ({saveToken}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [viewPass, setViewPass] = useState(false);
  const handleView = () => {
    setViewPass(!viewPass)
    }
  const ingresoCuenta = async (values) => {
    try {
      const resLogin = await clienteAxios.post (
        '/user/login',
        {
          email: values.email,
          pass: values.pass
        },
        config
      )
      if(resLogin?.data?.token){
        sessionStorage.setItem('token', JSON.stringify(resLogin.data.token) )
        sessionStorage.setItem('idUser', JSON.stringify(resLogin.data.userExist._id))
        sessionStorage.setItem('role', JSON.stringify(resLogin.data.userExist.role))
        resLogin.data?.userExist?.role === 'user'
        ? navigate('/')
        : navigate('/admin')
        saveToken(res?.data?.updateData?.token, res?.data?.updateData?.role )
      }else{
        Swal.fire({
          icon: "error",
          title: "¡Oh no!",
          text: "Usuario y/o contraseña incorrectos",
        });
      }
      
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error.response.data.msg,
      });
    }
  }
  return (
    <>
      <button
        className="bg-black navbarLink button_slide slide_down"
        onClick={handleShow}
      >
        Iniciar Sesión
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese a su cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ email: "", pass: "" }}
            onSubmit={(values) => ingresoCuenta(values)}
            validationSchema={errorLogin}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <InputGroup>
                  <InputGroup.Text>
                  <i class="bi bi-envelope-at"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Ingrese su correo electrónico"
                    className={errors.email && touched.email && "is-invalid"}
                    />
                    </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.email && touched.email && errors.email}
                  </small>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i class="bi bi-shield-lock-fill"></i>
                  </InputGroup.Text>
                    <Form.Control
                      type={!viewPass ? "password" : "text"}
                      name="pass"
                      value={values.pass}
                      onChange={handleChange}
                      placeholder="**********"
                      className={errors.pass && touched.pass && "is-invalid"}
                    />
                  <Button variant="light" onClick={handleView}>
                      <i
                        className={!viewPass ? "bi bi-eye-slash" : "bi bi-eye"}
                        ></i>
                    </Button>
                </InputGroup>
                    <small className="text-danger">
                      {" "}
                      {errors.pass && touched.pass && errors.pass}
                    </small>
                        </Form.Group>

                <div className="d-flex  justify-content-around">
                  <button
                    className="boton_eliminar slide_right_eliminar"
                    onClick={handleClose}
                  >
                    <i className="bi me-2 bi-x-circle-fill"></i>
                    Cerrar
                  </button>
                  <button
                    className="boton slide_right"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i className="bi me-2 bi-check-square-fill"></i>
                    Iniciar Sesion{" "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default ModalLogin;
