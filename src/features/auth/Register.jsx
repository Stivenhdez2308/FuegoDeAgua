import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Error al registrarse. Intenta con otro correo.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-green-800">Registro</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-700 text-white py-2 rounded hover:bg-green-800">Registrarse</button>
        <p className="text-sm mt-2">¿Ya tienes cuenta? <a href="/login" className="text-green-700 underline">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default Register; 