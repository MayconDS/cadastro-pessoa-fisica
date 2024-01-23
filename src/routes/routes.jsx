import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

import PrivateRouter from "./PrivateRouter";
import RegisterCpf from "../pages/register-cpf/registerCpf";
import EditCpf from "../pages/edit-cpf/editCpf";

const Routering = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register-cpf"
          element={
            <PrivateRouter>
              <RegisterCpf />
            </PrivateRouter>
          }
        />
        <Route
          path="/edit/cpf/:id"
          element={
            <PrivateRouter>
              <EditCpf />
            </PrivateRouter>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routering;
