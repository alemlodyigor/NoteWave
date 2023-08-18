import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Note from "./pages/Note";
import Settings from "./pages/Settings";
import DeleteAcc from "./components/DeleteAcc";
import ChangePassword from "./components/ChangePassword";
import ChangeEmail from "./components/ChangeEmail";

const RoutesConfig = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<Create />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/settings/changemail" element={<ChangeEmail />} />
        <Route path="/settings/changepassword" element={<ChangePassword />} />
        <Route path="/settings/deleteaccount" element={<DeleteAcc />} />
        <Route path="edit/:noteId" element={<Edit />} />
        <Route path="note/:uid/:noteId" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
