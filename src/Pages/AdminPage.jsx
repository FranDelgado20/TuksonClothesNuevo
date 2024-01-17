import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProdAdminComp from "../Components/ProdAdminComp";

const AdminPage = () => {
  const [key, setKey] = useState("home");
  return (
    <Container fluid className="my-3 ">
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
          Tab content for Profile
        </Tab>
        <Tab eventKey="profile" title="Perfil de administrador">
          Tab content for Contact
        </Tab>
        
      </Tabs>
    </Container>
  );
};

export default AdminPage;
