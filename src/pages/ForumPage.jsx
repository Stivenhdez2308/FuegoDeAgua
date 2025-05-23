import React from 'react';
import ForumList from '../features/forum/ForumList';

const ForumPage = () => (
  <div className="min-h-screen flex flex-col items-center bg-green-50 py-6 sm:py-8 px-2 sm:px-4">
    <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-800">Foro de Diseños</h2>
    <ForumList />
  </div>
);

export default ForumPage; 