import React from 'react';

const catalogImages = [
  '/cat1.png', '/cat2.png', '/cat3.png', '/cat4.png', '/cat5.png', '/cat6.png', '/cat7.png', '/cat8.png', '/cat9.png', '/cat10.png', '/cat11.png', '/cat12.png', '/cat13.png', '/cat14.png', '/cat15.png'
];

const CatalogPage = () => (
  <div className="min-h-screen flex flex-col items-center bg-green-50 py-6 sm:py-8 px-2 sm:px-4 md:px-8">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4 text-green-800">Catálogo de Productos</h2>
    <p className="text-gray-600 mb-4 sm:mb-6 text-center max-w-md sm:max-w-xl">Explora nuestro catálogo de velas y jabones ecológicos. Desliza para ver todas las páginas.</p>
    <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl flex flex-col gap-4 sm:gap-8 items-center">
      {catalogImages.map((img, idx) => (
        <div key={img} className="w-full flex flex-col items-center">
          <div className="w-full rounded-xl shadow-lg overflow-hidden border border-green-200 bg-white">
            <img src={img} alt={`Catálogo página ${idx+1}`} className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <span className="mt-1 sm:mt-2 text-green-700 text-xs sm:text-sm md:text-base font-semibold">Página {idx+1} / {catalogImages.length}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CatalogPage; 