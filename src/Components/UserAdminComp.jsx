import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalCrearProdComp from "./ModalCrearProdComp";
import Swal from "sweetalert2";
import clienteAxios, { config } from "../utils/axios";
import ModalEditarProdComp from "./ModalEditarProdComp";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
const UserAdminComp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const obtenerUsuario = async (id) => {
    setShow(true);
    try {
      const resGetUser = await clienteAxios.get(`/user/${id}`);
      setUsuario(resGetUser.data.getUser);
    } catch (error) {}
  };
  const obtenerUsuarios = async () => {
    try {
      const resGetUsers = await clienteAxios.get("/user");
      setUsuarios(resGetUsers.data.getUsers);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error.response.data.msg,
      });
    }
  };
  const editarRol = async (values) => {
    try {
      const resEdit = await clienteAxios.put(
        `/user/${usuario._id}/role`,
        {
          role: values.role,
        },
        config
      );
      if (resEdit.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Usuario Editado!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      obtenerUsuarios();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);
  return (
    <>
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => obtenerUsuario(user._id)}
                  >
                    Editar
                  </Button>
                  <Formik
                    initialValues={{ role: usuario.role }}
                    onSubmit={(values) => editarRol(values)}
                  >
                    {({ values, handleChange, handleSubmit }) => (
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Editar la configuración de usuario
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Select
                            name="role"
                            aria-label="Default select example"
                            value={values.role}
                            onChange={handleChange}
                          >
                            <option>
                              {usuario.role === "user"
                                ? "Usuario"
                                : "Administrador"}
                            </option>
                            {usuario.role === "user" ? (
                              <option value="admin">Administrador</option>
                            ) : (
                              <option value="user">Usuario</option>
                            )}
                          </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                          </Button>
                          <Button variant="primary" onClick={handleSubmit}>
                            Guardar Cambios
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </Formik>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserAdminComp;
