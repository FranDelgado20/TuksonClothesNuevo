import { Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import clienteAxios, { config } from "../utils/axios";
import Swal from "sweetalert2";
import { errorCreateProduct } from "../helpers/validationSchemaErrors";

const ModalEditarProdComp = ({ idProd }) => {
  const [producto, setProducto] = useState({});
  const [productos, setProductos] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const obtenerProducto = async () => {
    const resObtener = await clienteAxios.get(`/products/${idProd}`);
    setProducto(resObtener.data.getProduct);
  };
  const obtenerProductos = async () => {
    const resObtener = await clienteAxios.get("/products");
    setProductos(resObtener.data.getProducts);
  };
  const editarProducto = async (values) => {
    try {
      if (
        producto.name === values.name &&
        producto.price === values.price &&
        producto.model === values.model &&
        producto.idProd === values.idProd &&
        producto.size === values.size &&
        producto.stock === values.stock
      ) {
        return Swal.fire({
          title: "Que raro..",
          text: "Al parecer no realizaste ningún cambio",
          icon: "info",
        });
      }
      const resEdit = await clienteAxios.put(
        `/products/${idProd}`,
        {
          name: values.name,
          price: values.price,
          model: values.model,
          idProd: values.idProd,
          size: values.size,
          stock: values.stock,
        },
        config
      );
      if (resEdit.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Producto Editado!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      obtenerProductos();
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
  useEffect(() => {
    obtenerProducto();
  }, []);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar Producto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creá un producto</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: producto.name,
            price: producto.price,
            model: producto.model,
            idProd: producto.idProd,
            size: producto.size,
            stock: producto.stock,
          }}
          onSubmit={(values) => editarProducto(values)}
          validationSchema={errorCreateProduct}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el nombre del producto</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-box-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      placeholder="Ej: Zapatillas Nike Air Force"
                      className={errors.name && touched.name && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.name && touched.name && errors.name}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el precio del producto</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-currency-dollar"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      min={0}
                      onChange={handleChange}
                      value={values.price}
                      placeholder="Ej: 99999"
                      className={errors.price && touched.price && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.price && touched.price && errors.price}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el modelo del producto</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-qr-code-scan"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="model"
                      onChange={handleChange}
                      value={values.model}
                      placeholder="Ej: Air Force 1"
                      className={errors.model && touched.model && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.model && touched.model && errors.model}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el ID compartido del producto</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-qr-code"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="idProd"
                      onChange={handleChange}
                      value={values.idProd}
                      placeholder="Ej: 000"
                      className={
                        errors.idProd && touched.idProd && "is-invalid"
                      }
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.idProd && touched.idProd && errors.idProd}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el talle del producto</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-hash"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="size"
                      onChange={handleChange}
                      value={values.size}
                      placeholder="Ej: 41.5"
                      className={errors.size && touched.size && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.size && touched.size && errors.size}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el stock disponible</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-boxes"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="stock"
                      onChange={handleChange}
                      value={values.stock}
                      min={0}
                      placeholder="Ej: 5"
                      className={errors.stock && touched.stock && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {" "}
                    {errors.stock && touched.stock && errors.stock}
                  </small>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Guardar Cambios
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalEditarProdComp;
