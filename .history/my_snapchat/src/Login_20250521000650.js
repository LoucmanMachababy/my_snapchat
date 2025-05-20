import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://snapchat.epihub.eu/docs/",
        form
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la connexion");
    }
  };

  //   const handleSnapLogin = () => {
  //     const clientId = "";
  //     const redirectUri = "http://localhost:3000/callback";
  //     const scope = "user.display_name user.bitmoji.avatar";
  //     const authUrl = `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //       redirectUri
  //     )}&response_type=code&scope=${encodeURIComponent(scope)}`;
  //     window.location.href = authUrl;
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <button type="submit">Se connecter</button>
      </form>
      <hr />
      <button onClick={handleSnapLogin}>Se connecter avec Snapchat</button>
    </div>
  );
};

export default Login;
