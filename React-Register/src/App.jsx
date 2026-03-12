import { useState } from "react";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Editor from "./Editor";
import Admin from "./Admin";
import Missing from "./Missing";
import Unauthorized from "./Unauthorized";
import Lounge from "./Lounge";
import LinkPage from "./LinkPage";
import RequireAuth from "./RequireAuth";
import PersistLogin from "./PersistLogin";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkPage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* We want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
