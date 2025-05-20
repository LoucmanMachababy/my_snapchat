import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", {
        email: form.email,
        login: form.username,
        password: form.password,
      });
      navigate("/"); // Vers la page de connexion
    } catch (err) {
      const msg =
        err.response?.data?.message || "Erreur lors de l'inscription.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        required
        value={form.username}
        onChange={handleChange}
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        required
        value={form.password}
        onChange={handleChange}
      />
      <br />

      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
