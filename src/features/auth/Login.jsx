import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-2 py-8">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-5 animate-fade-in"
      >
        <h2 className="text-2xl font-bold mb-2 text-green-800 text-center">Iniciar Sesión</h2>
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
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white py-2 rounded-full font-bold hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="bg-white border border-red-400 text-red-600 font-bold py-2 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block"><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.1-5.5 7-10.3 7-6.1 0-11-4.9-11-11s4.9-11 11-11c2.4 0 4.6.8 6.4 2.1l6-6C36.1 6.5 30.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.2-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.4 0 4.6.8 6.4 2.1l6-6C36.1 6.5 30.4 4 24 4 15.3 4 7.7 9.8 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c6.2 0 11.4-2 15.2-5.5l-7-5.7C30.1 34.5 27.2 35.5 24 35.5c-4.7 0-8.7-2.9-10.3-7l-6.6 5.1C7.7 38.2 15.3 44 24 44z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-4 4.9l6.4 5c3.7-3.4 6.3-8.4 6.3-13.9 0-1.3-.1-2.2-.3-3.5z"/></g></svg>
          Entrar con Google
        </button>
        <p className="text-sm mt-2 text-center">¿No tienes cuenta? <a href="/register" className="text-green-700 underline">Regístrate</a></p>
      </form>
    </div>
  );
};

export default Login; 