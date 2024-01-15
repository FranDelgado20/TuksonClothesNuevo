import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import SobreNosotros from "../Pages/SobreNosotros";
import Productos from "../Pages/Productos";
import MiCuenta from "../Pages/MiCuenta";
import PrivateRoutes from "../Components/PrivateRoute";

const RoutesViews = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nosotros" element={<SobreNosotros />} />
      <Route path="/productos" element={<Productos />} />
      <Route
        path="/myAccount"
        element={
          <PrivateRoutes role={"user"}>
            <MiCuenta />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default RoutesViews;
