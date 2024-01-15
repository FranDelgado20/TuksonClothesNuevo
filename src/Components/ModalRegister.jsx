import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import emailjs from "emailjs-com";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


import Swal from "sweetalert2";
import { Formik } from "formik";
import { errorRegister } from "../helpers/validationSchemaErrors";
import clienteAxios from "../utils/axios";
import { Button } from "react-bootstrap";
const ModalRegister = () => {
  console.log(
    import.meta.env.VITE_SERVICE,
    import.meta.env.VITE_TEMPLATE,
    import.meta.env.VITE_PUBLICKEY
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [viewPass, setViewPass] = useState(false);
  const [viewrPass, setViewrPass] = useState(false);
  const handleView = () => {
  setViewPass(!viewPass)
  }
  const handleView2 = () => {
  setViewrPass(!viewrPass)
  }
  const crearCuenta = async (values) => {
    try {
      if (values.pass === values.rPass) {
        const resRegister = await clienteAxios.post("/user", {
          fullName: values.fullName,
         
          email: values.email,
          pass: values.pass,
          numberPhone: values.numberPhone
        });
        if (resRegister.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            showConfirmButton: false,
            timer: 1500,
          });
          setShow(false);

          const templateParams = {
            to_email: values.email,
            user_name: values.user,
            message:
              "Hola te damos la bienvenida a Tukson Clothes, aquí encontraras todo lo que estas buscando para estar a la moda ",
          };
          await emailjs.send(
            import.meta.env.VITE_SERVICE,
            import.meta.env.VITE_TEMPLATE,
            templateParams,
            import.meta.env.VITE_PUBLICKEY
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "¡OH NO!",
          text: "Las contraseñas no coinciden",
        });
      }
    } catch (error) {
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
    <>
      <button
        className="bg-black navbarLink button_slide slide_down"
        onClick={handleShow}
      >
        Registrarse
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creá tu cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ fullName: "", email: "", pass: "", rPass: "", numberPhone: "" }}
            onSubmit={(values) => crearCuenta(values)}
            validationSchema={errorRegister}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <InputGroup>
                  <InputGroup.Text id="groupEmail">
                  <i class="bi bi-person"></i>
                </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    placeholder="Ingrese su nombre completo"
                    className={errors.fullName && touched.fullName && "is-invalid"}
                    />
                 
                    </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.fullName && touched.fullName && errors.fullName}
                  </small>
                </Form.Group>
               
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
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
                <Form.Group controlId="validationCustom05">
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text id="groupEmail">
                  <>
                    <i class="bi bi-telephone"></i>
                  </>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={values.numberPhone}
                 placeholder="+54 000 0000000"
                  name="numberPhone"
                  onChange={handleChange}
                  maxLength={13}
                  className={errors.numberPhone && touched.numberPhone && "is-invalid"}
                />
              </InputGroup>

              <small className="text-black">
                El formato correcto es: +54 000 0000000.(Sin dejar espacios)
              </small>
              <small className="text-danger">
                {" "}
                {errors.numberPhone &&
                  touched.numberPhone &&
                  errors.numberPhone}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Repetir Contraseña</Form.Label>
                <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i class="bi bi-shield-lock-fill"></i>
                  </InputGroup.Text>
                    <Form.Control
                      type={!viewrPass ? "password" : "text"}
                      name="rPass"
                      value={values.rPass}
                      onChange={handleChange}
                      placeholder="**********"
                      className={errors.rPass && touched.rPass && "is-invalid"}
                    />
                  <Button variant="light" onClick={handleView2}>
                      <i
                        className={!viewrPass ? "bi bi-eye-slash" : "bi bi-eye"}
                        ></i>
                    </Button>
                </InputGroup>
                    <small className="text-danger">
                      {" "}
                      {errors.rPass && touched.rPass && errors.rPass}
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
                    Registrarse{" "}
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

export default ModalRegister;
