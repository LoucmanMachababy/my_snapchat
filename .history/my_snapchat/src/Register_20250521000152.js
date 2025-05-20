// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("      await axios.post("https://ton-api.com/register", form);
", form);
      navigate("/login");
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={form.username}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
