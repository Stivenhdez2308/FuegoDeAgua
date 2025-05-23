import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';

const productos = [
  {
    nombre: 'Vela Ecológica',
    descripcion: 'Hecha 100% de aceite reciclado, aroma natural y diseño artesanal.',
    imagen: '/Vela.png',
  },
  {
    nombre: 'Jabón de Cocina',
    descripcion: 'Jabón biodegradable elaborado con aceites reutilizados.',
    imagen: '/Jabon.png',
  },
  {
    nombre: 'Vela Personalizada',
    descripcion: 'Personaliza tu vela: elige modelo, color y mensaje.',
    imagen: '/Velaperso.png',
  },
];

const aliados = [
  { nombre: 'Fedepalma', logo: '/fedepalma.png' },
  { nombre: 'Bella y Saludable', logo: '/bella.png' },
  { nombre: 'Sin Fronteras', logo: '/Sinfronteras.jpg' },
];

const LandingPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col">
      {/* MENSAJE DE BIENVENIDA */}
      {user && user.displayName && (
        <div className="w-full flex justify-center animate-fade-in">
          <div className="bg-green-100 border border-green-300 text-green-900 rounded-full px-6 py-2 mt-4 mb-2 shadow font-semibold text-lg">
            ¡Bienvenido/a, {user.displayName}!
          </div>
        </div>
      )}
      {/* HERO */}
      <section className="flex flex-col items-center justify-center py-10 sm:py-14 md:py-16 px-2 sm:px-4 text-center">
        <div className="mb-4 sm:mb-6 animate-bounce-slow">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-green-200 bg-green-600 flex items-center justify-center overflow-hidden">
            <img src="/Logo.jpg" alt="Logo Fuego de Agua" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-2 sm:mb-4 drop-shadow-lg animate-slide-up font-montserrat">
          Fuego de Agua
        </h1>
        <p className="text-lg sm:text-xl text-green-700 max-w-md sm:max-w-xl md:max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed animate-slide-up-delayed">
          Protegiendo el agua y el planeta con velas y jabones ecológicos hechos a partir de aceite reciclado.<br />
          <span className="text-yellow-700 font-semibold mt-2 block">
            ¡Descubre, personaliza y comparte tu creatividad!
          </span>
        </p>
        <Link
          to="/catalog"
          className="bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold shadow-lg hover:bg-green-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse-gentle"
        >
          Ver catálogo
        </Link>
        <div className="mt-8 sm:mt-12 flex space-x-6 sm:space-x-8 opacity-60">
          <div className="text-green-600 text-3xl sm:text-4xl animate-float">🌱</div>
          <div className="text-blue-600 text-3xl sm:text-4xl animate-float-delayed">💧</div>
          <div className="text-yellow-600 text-3xl sm:text-4xl animate-float">♻️</div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="bg-white/80 py-8 sm:py-12 px-2 sm:px-4 flex flex-col items-center" id="quienes-somos">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2 sm:mb-4 font-montserrat">¿Quiénes somos?</h2>
        <p className="max-w-md sm:max-w-2xl md:max-w-3xl text-base sm:text-lg text-gray-700 mb-2 sm:mb-4 text-center">
          Fuego de Agua nace en Cali con el propósito de proteger nuestros recursos naturales y ecosistemas a través del aprovechamiento del aceite usado de cocina. Fabricamos productos artesanales, 100% ecológicos, como velas y jabones, fomentando la economía circular y el cuidado del agua.
        </p>
        <p className="max-w-md sm:max-w-2xl md:max-w-3xl text-sm sm:text-md text-green-900 text-center mb-1 sm:mb-2">
          "Por cada litro de aceite que cae a los ríos, se contaminan 1.000 litros de agua. Con nuestras velas, evitamos que los residuos del aceite lleguen a las cuencas hídricas y las contaminen."
        </p>
        <span className="text-xs sm:text-sm text-gray-500">Laura Camila Gómez Reina, fundadora</span>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-8 sm:py-14 px-2 sm:px-4 bg-gradient-to-b from-white to-green-50" id="productos">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-8 text-center font-montserrat">Productos destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {productos.map((prod, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full flex flex-col items-center hover:scale-105 transition-transform">
              <img src={prod.imagen} alt={prod.nombre} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-3 sm:mb-4 border-4 border-green-100 shadow" />
              <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-1 sm:mb-2 font-montserrat">{prod.nombre}</h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">{prod.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALIADOS */}
      <section className="py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center bg-white/70">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4 sm:mb-6 font-montserrat">Aliados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 justify-center items-center">
          {aliados.map((a, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={a.logo} alt={a.nombre} className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-1 sm:mb-2" />
              <span className="text-green-700 text-xs sm:text-sm font-semibold text-center">{a.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-800 text-white py-4 sm:py-6 mt-8 flex flex-col items-center text-xs sm:text-sm">
        <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
          <a href="https://www.instagram.com/fuegodeagua.co/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors text-xl sm:text-2xl">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 inline"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
          </a>
          <span className="text-xs sm:text-sm">@fuegodeagua</span>
        </div>
        <div className="text-[10px] sm:text-xs text-green-100">Cali, Colombia · tallerfuegodeagua@gmail.com</div>
        <div className="text-[10px] sm:text-xs mt-1">© {new Date().getFullYear()} Fuego de Agua. Todos los derechos reservados.</div>
      </footer>

      {/* Animaciones personalizadas */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.7s ease-out 0.3s both; }
        .animate-slide-up-delayed { animation: slide-up 0.7s ease-out 0.5s both; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float 3s ease-in-out infinite 1s; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .font-montserrat { font-family: 'Montserrat', 'Nunito', Arial, sans-serif; }
      `}</style>
    </div>
  );
};

export default LandingPage;