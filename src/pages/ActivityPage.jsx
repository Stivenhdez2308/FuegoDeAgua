import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../features/auth/AuthProvider';
import { models } from '../features/customizer/PreviewCandle';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

const ActivityPage = () => {
  const { user } = useAuth();
  const [votedCandles, setVotedCandles] = useState([]);
  const [commentedCandles, setCommentedCandles] = useState([]);

  useEffect(() => {
    if (!user) return;
    // Buscar velas donde el usuario ha comentado
    const q = query(collection(db, 'candles'));
    const unsub = onSnapshot(q, (snap) => {
      const allCandles = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Comentarios hechos por el usuario
      const commented = allCandles.filter(candle =>
        (candle.comments || []).some(com => com.user === user.email)
      );
      setCommentedCandles(commented);
      // Votos: para este prototipo, no guardamos quién votó, así que solo mostramos los comentados
      // Si quieres guardar los votos por usuario, habría que modificar la lógica de votos
      setVotedCandles([]);
    });
    return unsub;
  }, [user]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-green-50 py-6 sm:py-8 px-2 sm:px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-800">Tu Actividad</h2>
      <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-800">Comentarios hechos</h3>
        {commentedCandles.length === 0 && <p className="text-gray-600 mb-4 sm:mb-6">Aún no has comentado en ningún diseño.</p>}
        <AnimatePresence>
          {commentedCandles.map((candle, i) => (
            <motion.div
              key={candle.id}
              className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col md:flex-row gap-3 sm:gap-4 items-center border border-green-100 hover:shadow-2xl transition-shadow duration-300 w-full"
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <svg width="60" height="80" viewBox="0 0 100 160">
                <g color={candle.containerColor}>{models[candle.model]}</g>
                <ellipse cx="50" cy="90" rx="25" ry="30" fill={candle.waxColor} />
                <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
                <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
                {candle.text && (
                  <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{candle.text}</text>
                )}
              </svg>
              <div className="flex-1">
                <div className="font-bold text-green-800">{candle.topic}</div>
                <ul className="ml-4 list-disc">
                  {(candle.comments || []).filter(com => com.user === user.email).map((com, i) => (
                    <li key={i} className="text-gray-700"><span className="font-bold text-blue-700">Tú:</span> {com.text}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Votos: si en el futuro guardas los votos por usuario, aquí puedes mostrarlos */}
      </div>
    </motion.div>
  );
};

export default ActivityPage; 