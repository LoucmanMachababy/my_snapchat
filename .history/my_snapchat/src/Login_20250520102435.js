import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        em: email.trim(),
        password: password.trim(),
      });

      const member = res.data.member;
      console.log("Réponse complète :", res.data);
      console.log("Member ?", res.data.member);

      onLogin(member.login);
      localStorage.setItem("member", JSON.stringify(member));
      navigate(`/${member.login}`);
    } catch (err) {
      const msg =
        typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Erreur lors de la connexion.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;
