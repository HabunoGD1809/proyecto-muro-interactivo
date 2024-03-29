import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/'); // Utiliza navigate('/') en lugar de history.push('/')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;