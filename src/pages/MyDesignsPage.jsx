import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../features/auth/AuthProvider';
import { models } from '../features/customizer/PreviewCandle';

const MyDesignsPage = () => {
  const { user } = useAuth();
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'candles'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setDesigns(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [user]);

  const handlePublish = async (id) => {
    const designRef = doc(db, 'candles', id);
    await updateDoc(designRef, { published: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-50 py-6 sm:py-8 px-2 sm:px-4">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-800">Tus Diseños</h2>
      <div className="flex flex-col gap-4 sm:gap-8 items-center w-full max-w-md sm:max-w-2xl md:max-w-3xl mx-auto">
        {designs.length === 0 && <p className="text-gray-600">Aún no has creado ningún diseño.</p>}
        {designs.map(design => (
          <div key={design.id} className="bg-white rounded shadow p-4 sm:p-6 w-full flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
            <svg width="80" height="110" viewBox="0 0 100 160">
              <g color={design.containerColor}>{models[design.model]}</g>
              <ellipse cx="50" cy="90" rx="25" ry="30" fill={design.waxColor} />
              <rect x="47" y="30" width="6" height="30" fill="#333" rx="2" />
              <ellipse cx="50" cy="28" rx="6" ry="10" fill="#FFD700" />
              {design.text && (
                <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#333">{design.text}</text>
              )}
            </svg>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-800">{design.topic}</span>
                <span className="text-gray-500 text-sm">{design.createdAt?.toDate?.().toLocaleString?.() || ''}</span>
                {design.published && <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-2">Publicado</span>}
              </div>
              <div className="mt-2">
                {!design.published && (
                  <button
                    onClick={() => handlePublish(design.id)}
                    className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                  >
                    Publicar en el foro
                  </button>
                )}
                {design.published && <span className="text-green-700">Ya está publicado en el foro</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDesignsPage; 