import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import html2pdf from "html2pdf.js"; // Import html2pdf.js
import ReactMarkdown from "react-markdown";
import Will from "../components/Will";
import Lease from "../components/Lease";
import Divorce from "../components/Divorce";
import Nda from "../components/Nda";
import Partnership from "../components/Partnership";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { marked } from "marked";  

const DocDrafter = () => {
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState("");
  const [systemInstruction, setSystemInstruction] = useState("");
  const [response, setResponse] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  // GEMINI SECTION
  const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`);

  const sendToGemini = async (message) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "tunedModels/docdrafterfinal-75a25zggnf0h",
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });

      const chat = model.startChat({
        history: [],
        generationConfig: { temperature: 0.9 },
      });

      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  const fixMarkdown = async (message) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: .7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });

      const chat = model.startChat({
        history: [],
        generationConfig: { temperature: 0.9 },
      });

      const prompt = `Convert the following text to markdown format. Use Titles and whatever necessary: \n\n${message}`;
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  const Submit = async (message) => {
    toast.info("Generating document...");

    try {
      const result = await sendToGemini(message);
      
      
      
     const res = await fixMarkdown(result); 
      
      setResponse(res);
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  // PDF SECTION
  useEffect(() => {
    if (response) {
      setTextAreaValue(response);
      toast.success("Document generated successfully!");
    }
  }, [response]);

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };



  const generatePDF = () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
  
    // Convert Markdown to HTML if needed
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
        ${marked.parse(textAreaValue)} <!-- Convert Markdown to HTML -->
      </div>
    `;
    element.innerHTML = htmlContent;
  
    const opt = {
      margin: 10,
      filename: `${page || "document"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
  
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element);
      })
      .catch((error) => {
        console.error("PDF generation error:", error);
        toast.error("Failed to generate PDF.");
        document.body.removeChild(element);
      });
  };
  const onButtonClick = (documentName) => {
    setClicked(true);
    setPage(documentName);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      {!clicked && (
        <div>
          <h1 className="text-blue-600 text-2xl mb-12 text-center font-bold">
            Choose a Document to Draft:
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => onButtonClick("Divorce")}
            >
              Divorce Agreement
            </button>
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => onButtonClick("Will")}
            >
              Will
            </button>
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => onButtonClick("Lease")}
            >
              Lease Agreement
            </button>
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => onButtonClick("Nda")}
            >
              Non-Disclosure Agreement
            </button>
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => onButtonClick("Partnership")}
            >
              Partnership Deed
            </button>
          </div>
        </div>
      )}
      <div>
        {clicked && (
          <div>
            <button
              className="px-5 py-3 text-base font-medium border-2 border-white bg-blue-600 text-white rounded transition hover:text-gray-900 hover:bg-white hover:border-blue-600"
              onClick={() => {
                setClicked(false);
                setResponse("");
              }}
            >
              <FaArrowLeft />
            </button>
            {page === "Will" && (
              <Will
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page === "Divorce" && (
              <Divorce
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page === "Lease" && (
              <Lease
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page === "Nda" && (
              <Nda
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page === "Partnership" && (
              <Partnership
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
          </div>
        )}
      </div>

      <div>
        {response && (
          <div className="mt-8 max-w-2xl">
            <h2 className="text-blue-600 text-xl font-medium mb-4">
              Generated Document
            </h2>
            {/* <div className="border p-4 rounded w-full mb-4 bg-white">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div> */}
            <textarea
              value={textAreaValue}
              onChange={handleTextAreaChange}
              className="border p-4 rounded w-full h-96 mb-4"
              placeholder="Edit the document here if needed..."
            />
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
            >
              Generate PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocDrafter;