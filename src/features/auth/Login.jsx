import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-green-800">Iniciar Sesión</h2>
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
        <button type="submit" className="bg-green-700 text-white py-2 rounded hover:bg-green-800">Entrar</button>
        <button type="button" onClick={handleGoogle} className="bg-red-500 text-white py-2 rounded hover:bg-red-600">Entrar con Google</button>
        <p className="text-sm mt-2">¿No tienes cuenta? <a href="/register" className="text-green-700 underline">Regístrate</a></p>
      </form>
    </div>
  );
};

export default Login; 