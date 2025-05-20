import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
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
    );
  }
  
  export default Login;
  