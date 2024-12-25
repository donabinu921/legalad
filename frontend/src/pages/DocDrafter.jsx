import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocDrafter = () => {
  const navigate = useNavigate();

  const onButtonClick = (documentName) => {
    navigate('/' + documentName.toLowerCase().replace(/ /g, '-'));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-blue-600 text-2xl mb-12 text-center font-bold">
        Choose a Document to Draft:
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600" 
          onClick={() => onButtonClick('Non-Disclosure Agreement')}
        >
          Non-Disclosure Agreement
        </button>
        <button 
          className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600" 
          onClick={() => onButtonClick('Will')}
        >
          Will
        </button>
        <button 
          className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600" 
          onClick={() => onButtonClick('Lease Agreement')}
        >
          Lease Agreement
        </button>
      </div>
    </div>
  );
};

export default DocDrafter;