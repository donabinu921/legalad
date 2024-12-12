import React from 'react'
import { useState } from 'react'
import '../styles/DocAnalyser.css'

const DocAnalyser = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file){
      console.log(file);
      setFileURL(URL.createObjectURL(file));
    } 
    else{
      console.log('No file uploaded');
    }
  };

  return (
    <div className='docanalyser'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="document">UPLOAD THE DOCUMENT:</label>
        <input type="file" name="document" id='document' accept=".pdf" onChange={handleFileChange}/>
        <button type="submit">Analyse</button>
      </form>
      {fileURL && (
        <div className='display'>
          <h3>Uploaded Document:</h3>
          <iframe src={fileURL} width="100%" height="300px" title="Uploaded Document"></iframe>
          <div className='analysis'>
            <p>Here is the analysis of the uploaded file.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocAnalyser