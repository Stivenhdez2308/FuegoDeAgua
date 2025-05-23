import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Inicio', always: true },
    { to: '/catalog', label: 'Catálogo', always: true },
    { to: '/customizer', label: 'Personaliza', auth: true },
    { to: '/forum', label: 'Foro', auth: true },
    { to: '/visualize', label: 'Visualiza tu vela', auth: true },
    { to: '/profile', label: 'Perfil', auth: true },
  ];

  return (
    <nav className="bg-white/95 shadow-sm border-b border-green-100 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-6 py-2 sm:py-3 gap-2">
        {/* Logo */}
        <div className="flex items-center min-w-[60px] justify-start flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src="/Logo.jpg" alt="Logo Fuego de Agua" className="w-10 h-10 rounded-full object-cover border-2 border-green-200 shadow-sm" />
          </Link>
        </div>
        {/* Links - desktop */}
        <div className="hidden md:flex flex-row justify-center items-center w-full">
          {navLinks.filter(l => l.always || (l.auth && user)).map(l => (
            <NavLinkItem key={l.to} to={l.to} label={l.label} location={location} onClick={() => setMenuOpen(false)} flex />
          ))}
        </div>
        {/* Auth button & hamburger */}
        <div className="flex items-center min-w-[100px] justify-end z-10 gap-2 ml-2 flex-shrink-0">
          {/* Auth button */}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="text-red-600 font-bold px-4 py-1 rounded-full hover:bg-red-100 transition-colors duration-200 shadow-sm border border-red-100"
            >
              Salir
            </motion.button>
          ) : (
            <Link to="/login" className="text-green-700 font-bold px-4 py-1 rounded-full hover:bg-green-100 transition-colors duration-200 shadow-sm border border-green-100">Entrar</Link>
          )}
          {/* Hamburger - mobile only, a la derecha */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-green-50 transition-colors"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className={`block w-6 h-0.5 bg-green-800 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-green-800 rounded my-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-green-800 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg border-b border-green-100 flex flex-col items-center gap-2 py-4 z-40"
            >
              {navLinks.filter(l => l.always || (l.auth && user)).map(l => (
                <NavLinkItem key={l.to} to={l.to} label={l.label} location={location} onClick={() => setMenuOpen(false)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

function NavLinkItem({ to, label, location, onClick, flex }) {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-4 py-1 text-base sm:text-lg font-bold font-[Montserrat,sans-serif] transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 flex items-center justify-center
        ${isActive ? 'text-yellow-700 bg-green-50 shadow' : 'text-green-800 hover:text-green-900 hover:bg-green-50'} ${flex ? 'flex-1 mx-1' : ''}`}
      style={{ minWidth: 100, textAlign: 'center' }}
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