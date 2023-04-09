import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Category,
  Home,
  Option,
  Order,
  Setting,
  Signin,
  Signup,
  OrderMenu,
  AdminOrder,
} from "./pages";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/auth/ProtectRoute";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <ProtectRoute>
              <Signin />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <ProtectRoute>
              <Signup />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <ProtectRoute>
              <Category />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/setting"
          element={
            <ProtectRoute>
              <Setting />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/option"
          element={
            <ProtectRoute>
              <Option />
            </ProtectRoute>
          }
        ></Route>
        <Route path="/admin_order" element={<AdminOrder />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/order/menu_item" element={<OrderMenu />} />
      </Routes>
    </>
  );
};

export default App;
