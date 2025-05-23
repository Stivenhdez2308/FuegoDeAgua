import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../auth/AuthProvider';
import { models } from '../customizer/PreviewCandle';
import { motion } from 'framer-motion';

const VisualizeCandle = () => {
  const { user } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'candles'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setDesigns(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const selected = designs.find(d => d.id === selectedDesign);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-green-50 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-green-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Visualiza tu Vela en tu Espacio
      </motion.h2>
      <motion.div
        className="flex flex-col gap-4 w-full max-w-xl bg-white p-6 rounded-xl shadow-lg items-center border border-green-100"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      >
        <label className="font-semibold text-green-800">Selecciona un diseño:</label>
        <select
          value={selectedDesign}
          onChange={e => setSelectedDesign(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Elige uno de tus diseños</option>
          {designs.map(d => (
            <option key={d.id} value={d.id}>{d.topic || 'Sin temática'} - {d.text || 'Sin texto'}</option>
          ))}
        </select>
        <label className="font-semibold text-green-800">Sube una foto de tu espacio:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        {imageUrl && selected && (
          <motion.div
            className="relative w-full flex justify-center items-center"
            style={{ minHeight: 300 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          >
            <img src={imageUrl} alt="Tu espacio" className="rounded shadow max-w-full max-h-96" style={{ objectFit: 'contain' }} />
            {/* Superponer vela en la parte inferior central */}
            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: 30,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}>
              <svg width="80" height="110" viewBox="0 0 100 160">
                <g color={selected.containerColor}>{models[selected.model]}</g>
                <ellipse cx="50" cy="90" rx="25" ry="30" fill={selected.waxColor} />
                <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
                <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
                {selected.text && (
                  <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{selected.text}</text>
                )}
              </svg>
            </div>
          </motion.div>
        )}
        {!imageUrl && <p className="text-gray-500">Sube una foto y selecciona un diseño para ver la previsualización.</p>}
      </motion.div>
    </motion.div>
  );
};

export default VisualizeCandle; 