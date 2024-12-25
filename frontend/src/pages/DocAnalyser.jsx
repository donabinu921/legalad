import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';
import "../styles/DocAnalyser.css";

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`);

// Initialize PDF.js
const initPDFJS = async () => {
  const pdfjs = await import('pdfjs-dist/webpack');
  // Using CDN for the worker
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  return pdfjs;
};

const DocAnalyser = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [pdfjs, setPdfjs] = useState(null);

  useEffect(() => {
    // Initialize PDF.js when component mounts
    initPDFJS().then(setPdfjs).catch(console.error);
  }, []);

  // Function to extract text from PDF
  const extractPDFText = async (arrayBuffer) => {
    if (!pdfjs) {
      throw new Error('PDF.js not initialized');
    }

    try {
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  // Function to extract text from DOCX
  const extractDOCXText = async (arrayBuffer) => {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (error) {
      console.error('DOCX extraction error:', error);
      throw new Error('Failed to extract text from DOCX');
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  };

  const extractFileContent = async (file) => {
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      let text = '';

      switch (file.type) {
        case 'application/pdf':
          text = await extractPDFText(arrayBuffer);
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          text = await extractDOCXText(arrayBuffer);
          break;
        case 'text/plain':
          text = await readFileAsText(file);
          break;
        default:
          throw new Error(`Unsupported file type: ${file.type}`);
      }

      if (!text || text.trim().length === 0) {
        throw new Error('No text content could be extracted from the file');
      }

      return text;
    } catch (error) {
      console.error('Content extraction error:', error);
      throw error;
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
      setError(null);
      setAnalysisResult('');
      setExtractedText('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fileContent = await extractFileContent(file);
      setExtractedText(fileContent);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      const chat = model.startChat({
        history: [],
        generationConfig: { temperature: 0.7 },
      });

      const prompt = `As a legal advisor, please analyze the following document content and provide:
      1. A summary of the key points
      2. Any legal implications under Indian law
      3. Recommended actions or next steps
      
      Document content:
      ${fileContent}`;

      const result = await chat.sendMessage(prompt);
      setAnalysisResult(result.response.text());

    } catch (error) {
      console.error('Error analyzing document:', error);
      setError(`Failed to analyze the document: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label 
            htmlFor="document" 
            className="block text-2xl text-blue-600 font-bold mb-2"
          >
            Upload Document:
          </label>
          <input
            type="file"
            name="document"
            id="document"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-1">
            Supported formats: PDF, DOCX, TXT
          </p>
        </div>
        <button 
          type="submit" 
          disabled={loading || !file}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">
          {error}
        </div>
      )}

      {fileURL && (
        <div className="grid grid-cols-1 gap-4">
          <div className="border rounded p-4">
            <h3 className="text-xl font-medium mb-3  text-blue-600">Uploaded Document</h3>
            <iframe
              src={fileURL}
              className="w-full h-96 border"
              title="Uploaded Document"
            />
          </div>
          
          {extractedText && (
            <div className="border rounded p-4">
              <h3 className="text-xl font-medium mb-3  text-blue-600">Extracted Text</h3>
              <div className="prose max-w-none whitespace-pre-wrap">
                {extractedText}
              </div>
            </div>
          )}
          
          <div className="border rounded p-4">
            <h3 className="text-xl font-medium mb-3 text-blue-600">Analysis Results</h3>
            <div className="prose max-w-none">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <p>Analyzing document...</p>
                </div>
              ) : (
                analysisResult || 'Analysis results will appear here after processing.'
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocAnalyser;