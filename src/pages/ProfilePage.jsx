import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-2 sm:px-4 py-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center border border-green-100 w-full max-w-md sm:max-w-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-green-800 font-[Montserrat,sans-serif]">Mi Perfil</h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-center max-w-xs sm:max-w-md">Aquí podrás ver tus creaciones y tu información personal.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
          <motion.button
            className="bg-green-700 text-white px-4 py-2 rounded-full font-bold hover:bg-green-800 transition-colors duration-200 shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/my-designs')}
          >
            Tus diseños
          </motion.button>
          <motion.button
            className="bg-blue-700 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-800 transition-colors duration-200 shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/activity')}
          >
            Actividad
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage; 