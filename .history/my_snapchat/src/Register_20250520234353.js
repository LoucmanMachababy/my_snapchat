import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assure-toi que le backend attend "login", pas "username"
      await axios.post("/api/auth/register", {
        login: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/"); // Redirection vers la page de connexion
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
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        minLength={3}
        maxLength={20}
        required
        value={form.username}
        onChange={handleChange}
      />
      <br />

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
