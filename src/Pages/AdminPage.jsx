import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProdAdminComp from "../Components/ProdAdminComp";
import MiCuentaComp from "../Components/MiCuentaComp";
import clienteAxios from "../utils/axios";
import UserAdminComp from "../Components/UserAdminComp";

const AdminPage = () => {
  const [key, setKey] = useState("home");
  const [userInfo, setUserInfo] = useState({});
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
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
    <Container fluid className="my-3 text-white ">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        
        <Tab eventKey="productos" title="Productos">
         <ProdAdminComp/>
        </Tab>
        <Tab eventKey="usuarios" title="Usuarios">
        <UserAdminComp/>
        </Tab>
        <Tab eventKey="profile" title="Perfil de administrador">
        {Object.keys(userInfo).length > 0 ? (
                  <MiCuentaComp userInfo={userInfo} />
                ) : (
                  <div className="d-flex">
                  <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                  <p>Cargando información del usuario...</p>
                  </div>
                )}
        </Tab>
        
      </Tabs>
    </Container>
  );
};

export default AdminPage;
