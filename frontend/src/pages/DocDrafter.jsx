import React from 'react'
import "../styles/DocDrafter.css"

const DocDrafter = () => {
  const documentFiles = {
    'Police Complaint': 'assets/a.txt',
    'Will': 'assets/b.txt',
    'Lease Agreement': 'assets/c.txt'
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
      <h1>CHOOSE THE DOCUMENT TO DRAFT</h1>
      <div className='options'>
        <button onClick={() => onButtonClick('Police Complaint')}>Police Complaint</button>
        <button onClick={() => onButtonClick('Will')}>Will</button>
        <button onClick={() => onButtonClick('Lease Agreement')}>Lease Agreement</button>
      </div>
    </div>
  )
}

export default DocDrafter