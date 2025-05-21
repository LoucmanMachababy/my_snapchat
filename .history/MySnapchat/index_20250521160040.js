// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';  // Your main component, or the component where you manage routes
import Login from './pages/Login';  // Example Login Page
import Register from './pages/Register';  // Example Register Page

// Render the app with the router, which will handle all the routes.
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
