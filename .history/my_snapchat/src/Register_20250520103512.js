import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    l: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }
    try {
      await axios.post("/api/auth/register", form);
      navigate("/");
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
        name="login"
        placeholder="Enter a username"
        minLength={5}
        maxLength={20}
        required
        value={form.login}
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
        placeholder="Password"
        required
        value={form.password}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <br />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
