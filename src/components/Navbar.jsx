import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalog', label: 'Catálogo' },
  { to: '/customizer', label: 'Personaliza' },
  { to: '/forum', label: 'Foro' },
  { to: '/visualize', label: 'Visualiza tu vela' },
  { to: '/profile', label: 'Perfil' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      className="bg-white shadow p-2 sm:p-4 flex flex-wrap flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 sticky top-0 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {navLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`relative text-green-800 font-bold px-2 py-1 transition-colors duration-200 font-[Montserrat,sans-serif] ${location.pathname === link.to ? 'text-yellow-700' : 'hover:underline'}`}
        >
          {link.label}
          {location.pathname === link.to && (
            <motion.span
              layoutId="navbar-underline"
              className="absolute left-0 right-0 -bottom-1 h-1 bg-yellow-300 rounded"
              style={{ zIndex: -1 }}
            />
          )}
        </Link>
      ))}
      {user ? (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="text-red-600 font-bold ml-4 px-3 py-1 rounded hover:bg-red-100 transition-colors duration-200"
        >
          Salir
        </motion.button>
      ) : (
        <Link to="/login" className="text-green-700 font-bold ml-4 px-3 py-1 rounded hover:bg-green-100 transition-colors duration-200">Entrar</Link>
      )}
    </motion.nav>
  );
};

export default Navbar; 