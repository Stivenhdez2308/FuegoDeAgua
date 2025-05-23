import React from 'react';
import CustomizerForm from '../features/customizer/CustomizerForm';

const CustomizerPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-6 sm:py-8 px-2 sm:px-4">
    <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-800">Personaliza tu Vela</h2>
    <CustomizerForm />
  </div>
);

export default CustomizerPage; 