import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalCrearProdComp from "./ModalCrearProdComp";
import Swal from "sweetalert2";
import clienteAxios, { config } from "../utils/axios";
import ModalEditarProdComp from "./ModalEditarProdComp";

const ProdAdminComp = () => {
  const [productos, setProductos] = useState([]);
 
  const obtenerProductos = async () => {
    try {
      const resObtener = await clienteAxios.get("/products");
      setProductos(resObtener.data.getProducts);
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
  const actualizarDatos = () => {
    obtenerProductos()
  }
  const eliminarProducto = async (id) => {
    try {
      const resDelete = await clienteAxios.delete(`/products/${id}`, config);
      if (resDelete.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Producto Eliminado!",
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
    obtenerProductos();
  }, []);
  return (
    <>
      <Container fluid>
        <ModalCrearProdComp />
        <Button onClick={actualizarDatos}>Actualizar</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Unico</th>
              <th>ID Compartido</th>
              <th>Modelo</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Talle</th>
              <th>Stock</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos?.map((prod) => (
              <tr key={prod._id}>
                <td>{prod._id}</td>
                <td>{prod.idProd}</td>
                <td>{prod.model}</td>
                <td>{prod.name}</td>
                <td>${prod.price}</td>
                <td>{prod.size}</td>
                <td>{prod.stock} disponibles</td>
                <td>
                  <ModalEditarProdComp idProd={prod._id}/>
                  <Button onClick={() => eliminarProducto(prod._id)}>
                    {" "}
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ProdAdminComp;
