import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, updateDoc, arrayUnion, increment, query, orderBy, where, getDocs, limit } from 'firebase/firestore';
import { useAuth } from '../auth/AuthProvider';
import { models } from '../customizer/PreviewCandle';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_TOPICS = [
  'Día de la Madre',
  'Navidad',
  'Cumpleaños',
  'San Valentín',
  'Halloween',
  'Aniversario',
];

const LIMITED_UNITS = 200;

function getMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

const ForumList = () => {
  const [candles, setCandles] = useState([]);
  const [comment, setComment] = useState({});
  const [filter, setFilter] = useState('fecha');
  const [topicFilter, setTopicFilter] = useState('');
  const [limitedCandle, setLimitedCandle] = useState(null);
  const [unitsSold, setUnitsSold] = useState(0);
  const { user } = useAuth();

  // Buscar la vela más votada del mes
  useEffect(() => {
    const { start, end } = getMonthRange();
    const q = query(
      collection(db, 'candles'),
      where('published', '==', true),
      where('createdAt', '>=', start),
      where('createdAt', '<', end),
      orderBy('createdAt', 'desc'),
      orderBy('votes', 'desc'),
      limit(1)
    );
    getDocs(q).then(snap => {
      if (!snap.empty) {
        const docData = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setLimitedCandle(docData);
        setUnitsSold(docData.unitsSold || 0);
      } else {
        setLimitedCandle(null);
      }
    });
  }, []);

  useEffect(() => {
    let q = collection(db, 'candles');
    if (topicFilter) {
      q = query(q, where('topic', '==', topicFilter), where('published', '==', true));
    } else {
      q = query(q, where('published', '==', true));
    }
    if (filter === 'popularidad') {
      q = query(q, orderBy('votes', 'desc'));
    } else {
      q = query(q, orderBy('createdAt', 'desc'));
    }
    const unsub = onSnapshot(q, (snap) => {
      setCandles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [filter, topicFilter]);

  const handleVote = async (id) => {
    const candleRef = doc(db, 'candles', id);
    await updateDoc(candleRef, { votes: increment(1) });
  };

  const handleComment = async (id) => {
    if (!comment[id] || !user) return;
    const candleRef = doc(db, 'candles', id);
    await updateDoc(candleRef, {
      comments: arrayUnion({
        text: comment[id],
        user: user.email,
        date: new Date().toISOString(),
      })
    });
    setComment(prev => ({ ...prev, [id]: '' }));
  };

  const handleBuyLimited = async () => {
    if (!limitedCandle) return;
    const candleRef = doc(db, 'candles', limitedCandle.id);
    await updateDoc(candleRef, { unitsSold: (unitsSold || 0) + 1 });
    setUnitsSold((prev) => prev + 1);
    alert('¡Has reservado una unidad de la edición limitada!');
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-3xl mx-auto">
      {/* Edición limitada */}
      {limitedCandle && (
        <motion.div
          className="w-full bg-yellow-50 border-2 border-yellow-300 rounded p-6 mb-6 flex flex-col md:flex-row items-center gap-6 shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <div className="flex flex-col items-center">
            <span className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold mb-2 animate-pulse">EDICIÓN LIMITADA DEL MES</span>
            <svg width="100" height="140" viewBox="0 0 100 160">
              <g color={limitedCandle.containerColor}>{models[limitedCandle.model]}</g>
              <ellipse cx="50" cy="90" rx="25" ry="30" fill={limitedCandle.waxColor} />
              <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
              <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
              {limitedCandle.text && (
                <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{limitedCandle.text}</text>
              )}
            </svg>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="font-bold text-green-800 text-lg">{limitedCandle.topic}</span>
              <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded text-xs font-semibold ml-2">Más votada del mes</span>
            </div>
            <div className="text-gray-700 mt-2">Votos: <span className="font-bold">{limitedCandle.votes || 0}</span></div>
            <div className="text-gray-700">Unidades restantes: <span className="font-bold">{Math.max(0, LIMITED_UNITS - (unitsSold || 0))} / {LIMITED_UNITS}</span></div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded font-bold mt-2 hover:bg-yellow-500 disabled:opacity-50 shadow"
              onClick={handleBuyLimited}
              disabled={unitsSold >= LIMITED_UNITS}
            >
              ¡Quiero esta vela!
            </motion.button>
          </div>
        </motion.div>
      )}
      {/* Filtros y lista de velas */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full justify-between items-center">
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Ordenar por:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-1 rounded">
            <option value="fecha">Más recientes</option>
            <option value="popularidad">Más votados</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Temática:</label>
          <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="border p-1 rounded">
            <option value="">Todas</option>
            {SUGGESTED_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <AnimatePresence>
        {candles.map((candle, i) => (
          <motion.div
            key={candle.id}
            className="bg-white rounded-xl shadow-lg p-6 w-full flex flex-col md:flex-row gap-6 items-center border border-green-100 hover:shadow-2xl transition-shadow duration-300"
            custom={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <svg width="80" height="110" viewBox="0 0 100 160">
              <g color={candle.containerColor}>{models[candle.model]}</g>
              <ellipse cx="50" cy="90" rx="25" ry="30" fill={candle.waxColor} />
              <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
              <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
              {candle.text && (
                <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{candle.text}</text>
              )}
            </svg>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-800">{candle.userEmail}</span>
                <span className="text-gray-500 text-sm">{candle.createdAt?.toDate?.().toLocaleString?.() || ''}</span>
                {candle.topic && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-2">{candle.topic}</span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleVote(candle.id)}
                  className="bg-green-200 px-3 py-1 rounded hover:bg-green-300 shadow-sm font-semibold transition-colors duration-200"
                >
                  👍 {candle.votes || 0}
                </motion.button>
              </div>
              <div className="mt-2">
                <h4 className="font-semibold">Comentarios:</h4>
                <ul className="ml-4 list-disc">
                  {(candle.comments || []).map((c, i) => (
                    <li key={i}><span className="font-bold text-green-700">{c.user}:</span> {c.text}</li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Agregar comentario"
                    value={comment[candle.id] || ''}
                    onChange={e => setComment(prev => ({ ...prev, [candle.id]: e.target.value }))}
                    className="border p-1 rounded flex-1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleComment(candle.id)}
                    className="bg-green-700 text-white px-2 rounded shadow hover:bg-green-800"
                  >
                    Comentar
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ForumList; 