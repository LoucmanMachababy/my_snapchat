import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // Modifiez selon la structure de votre réponse réelle
  [key: string]: any;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>(
        "https://snapchat.epihub.eu/docs/",
        form
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la connexion");
    }
  };

  const handleSnapLogin = () => {
    // À implémenter selon l'authentification Snapchat
    console.log("Snapchat login not implemented.");
  };

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
