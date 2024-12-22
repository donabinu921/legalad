import React from 'react'
import "../styles/DocDrafter.css"
import { useNavigate } from 'react-router-dom';

const DocDrafter = () => {

  const navigate = useNavigate();

  const onButtonClick = (documentName) => {
    navigate('/' + documentName.toLowerCase().replace(/ /g, '-'));
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