import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../routes/PrivateRoutes";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import HomePage from "../components/HomePage";
import TableProducts from '../components/TableProducts';
import Category from '../components/Category';
import Color from '../components/Color';


const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<PrivateRoutes Component={HomePage} />} />
        <Route
          path="/Product"
          element={<PrivateRoutes Component={TableProducts} />}
        />
        <Route
          path="/Category"
          element={<PrivateRoutes Component={Category} />}
        />
        <Route path="/Color" element={<PrivateRoutes Component={Color} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
