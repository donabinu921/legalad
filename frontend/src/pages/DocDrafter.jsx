import React from 'react'
import "../styles/DocDrafter.css"

const DocDrafter = () => {
  const documentFiles = {
    'Non-Disclosure Agreement': 'assets/a.pdf',
    'Will': 'assets/b.pdf',
    'Lease Agreement': 'assets/c.pdf'
  };
  const onButtonClick = (documentType) => {
    const file = documentFiles[documentType];
    if (file) {
      console.log(`${documentType} button clicked, file: ${file}`);
      window.open(file, '_blank');
    } else {
      console.log('Unknown document type');
    }
  };

  return (
    <div className='docdrafter'>
      <h1>CHOOSE WHICH DOCUMENT TO DRAFT</h1>
      <div className='options'>
        <button onClick={() => onButtonClick('Non-Disclosure Agreement')}>Non-Disclosure Agreement</button>
        <button onClick={() => onButtonClick('Will')}>Will</button>
        <button onClick={() => onButtonClick('Lease Agreement')}>Lease Agreement</button>
      </div>
    </div>
  )
}

export default DocDrafter