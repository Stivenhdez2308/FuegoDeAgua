import React, { useState } from 'react';
import PreviewCandle from './PreviewCandle';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../auth/AuthProvider';
import { motion } from 'framer-motion';
import PersonalizadorOso from '../../components/PersonalizadorOso';

const SUGGESTED_TOPICS = [
  'Día de la Madre',
  'Navidad',
  'Cumpleaños',
  'San Valentín',
  'Halloween',
  'Aniversario',
  'Otra...'
];

const initialState = {
  model: 'classic',
  waxColor: '#f5e1c0',
  containerColor: '#b7e4c7',
  text: '',
  topic: '',
  customTopic: '',
};

const CustomizerForm = ({ onSave }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const topic = form.topic === 'Otra...' ? form.customTopic : form.topic;
      await addDoc(collection(db, 'candles'), {
        ...form,
        topic,
        customTopic: undefined,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        votes: 0,
        comments: [],
        published: false,
      });
      setSuccess('¡Diseño guardado!');
      setForm(initialState);
      if (onSave) onSave(form);
    } catch (err) {
      setError('Error al guardar el diseño. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-8 w-full justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border border-green-100 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        whileHover={{ scale: 1.03 }}
      >
        {form.model === 'oso-gigante' && (
          <img
            src={'/Oso Gigante.png'}
            alt="Oso Gigante real"
            className="absolute top-2 right-2 w-20 h-20 object-contain rounded-xl shadow-md border border-gray-200 bg-white/80 z-10"
            style={{ pointerEvents: 'none' }}
          />
        )}
        {form.model === 'oso-gigante' ? (
          <PersonalizadorOso />
        ) : (
          <PreviewCandle {...form} />
        )}
      </motion.div>
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-72 bg-white p-6 rounded-xl shadow-lg border border-green-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      >
        <label className="font-semibold text-green-800">Modelo:
          <select name="model" value={form.model} onChange={handleChange} className="border p-2 rounded w-full mt-1">
            <option value="classic">Clásica</option>
            <option value="square">Cuadrada</option>
            <option value="round">Redonda</option>
            <option value="oso-gigante">Oso Gigante</option>
          </select>
        </label>
        {form.model !== 'oso-gigante' && (
          <>
            <label className="font-semibold text-green-800">Color de la cera:
              <input type="color" name="waxColor" value={form.waxColor} onChange={handleChange} className="w-12 h-8 p-0 border-none ml-2 align-middle" />
            </label>
            <label className="font-semibold text-green-800">Color del recipiente:
              <input type="color" name="containerColor" value={form.containerColor} onChange={handleChange} className="w-12 h-8 p-0 border-none ml-2 align-middle" />
            </label>
            <label className="font-semibold text-green-800">Texto personalizado:
              <input type="text" name="text" value={form.text} onChange={handleChange} maxLength={20} className="border p-2 rounded w-full mt-1" placeholder="Tu mensaje" />
            </label>
          </>
        )}
        <label className="font-semibold text-green-800">Temática:
          <select name="topic" value={form.topic} onChange={handleChange} className="border p-2 rounded w-full mt-1">
            <option value="">Selecciona una temática</option>
            {SUGGESTED_TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        {form.topic === 'Otra...' && (
          <label className="font-semibold text-green-800">Escribe tu temática:
            <input type="text" name="customTopic" value={form.customTopic} onChange={handleChange} className="border p-2 rounded w-full mt-1" placeholder="Ej: Graduación" />
          </label>
        )}
        <motion.button
          type="submit"
          className="bg-green-700 text-white py-2 rounded-full font-bold hover:bg-green-800 transition-colors duration-200 mt-2 shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar diseño'}
        </motion.button>
        {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-700">{success}</motion.p>}
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500">{error}</motion.p>}
      </motion.form>
    </motion.div>
  );
};

export default CustomizerForm; 