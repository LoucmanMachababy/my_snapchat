import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={
          <Login onLogin={(login) => console.log("Connecté :", login)} />
        }
      />
      <Route path="/:login" element={<Blog />} />
      <Route path="/:login/post/:id" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
    </Routes>
  </BrowserRouter>
);
