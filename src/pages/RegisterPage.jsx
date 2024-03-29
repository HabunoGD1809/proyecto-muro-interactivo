import React, { useState } from 'react';
import { auth, firestore } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await firestore.collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
      });
      navigate('/'); // Utiliza navigate('/') en lugar de history.push('/')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>
    </div>
  );
}

export default RegisterPage;