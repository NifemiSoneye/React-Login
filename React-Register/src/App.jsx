import { useState } from "react";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<Linkpage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* We want to protect these routes */}
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor />} />
        <Route path="admin" element={<Admin />} />
        <Route path="lounge" element={<Lounge />} />

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
