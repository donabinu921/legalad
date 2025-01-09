import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsPDF } from "jspdf";
import Will from "../components/Will";
import Lease from "../components/Lease";
import Divorce from "../components/Divorce";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const DocDrafter = () => {
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState("");
  const [systemInstruction, setSystemInstruction] = useState("");
  const [response, setResponse] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  // GEMINI SECTION
  const genAI = new GoogleGenerativeAI(
    `${process.env.REACT_APP_GEMINI_API_KEY}`
  );

  const sendToGemini = async (message) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction:
          "You are a will drafting agent. The user will provide the necessary details for drafting a will. Draft the will based on the rules in India. It is understood that this is a sample will and a lawyer should be consulted, so don't give advise and provide only the draft of the will.",
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

  const Submit = async (message) => {
    toast.info("Generating document...");


    try {
      const result = await sendToGemini(message);
      setResponse(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  // PDF AAKANA SECTION
  useEffect(() => {
    if (response) {
      setTextAreaValue(response);
      toast.success("Will generated successfully!");
    }
  }, [response]);

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const maxLineHeight = pageHeight - margin * 2;
    let y = margin;

    const lines = doc.splitTextToSize(textAreaValue, 180); // Split text into lines that fit within 180 units width

    lines.forEach((line) => {
      if (y + 10 > maxLineHeight) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 10;
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  };

  const onButtonClick = (documentName) => {
    setClicked(true);
    setPage(documentName);
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
          </div>
        </div>
      )}
      <div>
        {clicked && (
          <div>
            {page == "Will" && (
              <Will
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page == "Divorce" && (
              <Divorce
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
            {page == "Lease" && (
              <Lease
                setSystemInstruction={setSystemInstruction}
                sendToGemini={Submit}
              />
            )}
          </div>
        )}
      </div>

      <div>
        {response && (
          <div className="mt-8">
            <h2 className="text-blue-600 text-xl font-medium mb-4">
              Generated Will
            </h2>
            <textarea
              value={textAreaValue}
              onChange={handleTextAreaChange}
              className="border p-4 rounded w-full h-96 mb-4"
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
