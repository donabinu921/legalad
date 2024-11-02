import React from 'react'
import '../styles/DocAnalyser.css'
const DocAnalyser = () => {
  return (
    <div className='docanalyser'>
      <form action="POST">
        <label>UPLOAD THE DOCUMENT:</label>
        <input type="file" name="document" accept=".pdf" />
        <button type="submit">Analyse</button>
      </form>
    </div>
  )
}

export default DocAnalyser