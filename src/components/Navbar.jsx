import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 shadow-sm border-b border-green-100 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between px-2 sm:px-6 py-2 sm:py-3 gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-[44px]">
          <img src="/Logo.jpg" alt="Logo Fuego de Agua" className="w-10 h-10 rounded-full object-cover border-2 border-green-200 shadow-sm" />
        </Link>
        {/* Links */}
        <div className="flex-1 flex flex-row justify-center items-center gap-1 sm:gap-4">
          <NavLinkItem to="/" label="Inicio" location={location} />
          <NavLinkItem to="/catalog" label="Catálogo" location={location} />
          {user && <NavLinkItem to="/customizer" label="Personaliza" location={location} />}
          {user && <NavLinkItem to="/forum" label="Foro" location={location} />}
          {user && <NavLinkItem to="/visualize" label="Visualiza tu vela" location={location} />}
          {user && <NavLinkItem to="/profile" label="Perfil" location={location} />}
        </div>
        {/* Auth button */}
        <div className="flex items-center min-w-[80px] justify-end">
          {user ? (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="text-red-600 font-bold px-3 py-1 rounded hover:bg-red-100 transition-colors duration-200"
            >
              Salir
            </motion.button>
          ) : (
            <Link to="/login" className="text-green-700 font-bold px-3 py-1 rounded hover:bg-green-100 transition-colors duration-200">Entrar</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

function NavLinkItem({ to, label, location }) {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`relative px-2 py-1 text-base sm:text-lg font-bold font-[Montserrat,sans-serif] transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400
        ${isActive ? 'text-yellow-700' : 'text-green-800 hover:text-green-900 hover:bg-green-50'}`}
      style={{ minWidth: 60, textAlign: 'center' }}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="navbar-underline"
          className="absolute left-1/2 -translate-x-1/2 right-0 -bottom-1 h-1 w-3/4 bg-yellow-300 rounded"
          style={{ zIndex: -1 }}
        />
      )}
    </Link>
  );
}

export default Navbar; 