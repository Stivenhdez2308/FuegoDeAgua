import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !name || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/');
    } catch (err) {
      setError('Error al registrarse. Intenta con otro correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-2 py-8">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-5 animate-fade-in"
      >
        <h2 className="text-2xl font-bold mb-2 text-green-800 text-center">Crea tu cuenta</h2>
        {error && <p className="text-red-500 text-center text-sm animate-shake">{error}</p>}
        <div className="flex flex-col gap-2">
          <label className="text-green-900 font-medium" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-green-200 p-2 rounded focus:ring-2 focus:ring-green-200 transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-900 font-medium" htmlFor="name">Nombre o Usuario</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre o usuario"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-green-200 p-2 rounded focus:ring-2 focus:ring-green-200 transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-900 font-medium" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-green-200 p-2 rounded focus:ring-2 focus:ring-green-200 transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-900 font-medium" htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="border border-green-200 p-2 rounded focus:ring-2 focus:ring-green-200 transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white py-2 rounded-full font-bold hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="text-sm mt-2 text-center">¿Ya tienes cuenta? <a href="/login" className="text-green-700 underline">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default Register; 