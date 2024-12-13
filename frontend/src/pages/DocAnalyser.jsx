import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DocAnalyser.css';

const DocAnalyser = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      console.log('File is analysed:', file.name);
      const fileURL = URL.createObjectURL(file);
      setFileURL(fileURL);

      const formData = new FormData();
      formData.append('file', file);

      const options = {
        method: 'POST',
        url: 'https://api.apyhub.com/ai/summarize-documents/file',
        headers: {
          // 'apy-token': 'APY0mPwpY48CR1YX5saGFwtwBYbbvtqQNW0A3PK35VreyFQ1IIa4PiBigkxUICLf',
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };

      try {
        const response = await axios.request(options);

        if (response.status === 200) {
          setAnalysisResult(response.data.data.summary); // Extract the summary from the response
        } else {
          console.log('Failed to fetch analysis');
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      }
    } else {
      console.log('No file uploaded');
    }
  };

  return (
    <div className='docanalyser'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="document">UPLOAD THE DOCUMENT:</label>
        <input type="file" name="document" id='document' accept=".pdf,.docx" onChange={handleFileChange} />
        <button type="submit">Analyse</button>
      </form>
      {fileURL && (
        <div className='result-container'>
          {/* <div className='display'>
            <h3>Uploaded Document:</h3>
            <iframe src={fileURL} width="100%" height="300px" title="Uploaded Document"></iframe>
          </div> */}
          <div className='analysis'>
            <h3>SUMMARY</h3>
            <p>{analysisResult || 'Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.Summary of the uploaded file will be displayed here.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocAnalyser;