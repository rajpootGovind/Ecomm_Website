import Signup from "@/pages/Signup";
import React from "react";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default AppRoutes;
