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
import Archived from "./components/Archived";

const RoutesConfig = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ element: Element }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <Element />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<ProtectedRoute element={Create} />} />
        <Route
          path="settings"
          element={<ProtectedRoute element={Settings} />}
        />
        <Route
          path="/settings/changemail"
          element={<ProtectedRoute element={ChangeEmail} />}
        />
        <Route
          path="/settings/changepassword"
          element={<ProtectedRoute element={ChangePassword} />}
        />
        <Route
          path="/settings/deleteaccount"
          element={<ProtectedRoute element={DeleteAcc} />}
        />
        <Route
          path="/settings/archivednotes"
          element={<ProtectedRoute element={Archived} />}
        />
        <Route
          path="edit/:noteId"
          element={<ProtectedRoute element={Edit} />}
        />
        <Route
          path="note/:uid/:noteId"
          element={<ProtectedRoute element={Note} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
