import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsPDF } from "jspdf";
import ReactMarkdown from "react-markdown";
import Will from "../components/Will";
import Lease from "../components/Lease";
import Divorce from "../components/Divorce";
import Nda from "../components/Nda";
import Partnership from "../components/Partnership";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

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
        model: "tunedModels/docdrafter-2zl52xcby2vh",
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
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set margins and initial position
    const margin = 15;
    let y = margin;

    // Helper function to check page overflow and add new page if needed
    const checkPageOverflow = (additionalHeight) => {
      const pageHeight = doc.internal.pageSize.height;
      if (y + additionalHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("LAST WILL AND TESTAMENT OF AMITH SUNIL", 105, y, { align: "center" });
    y += 10;

    // Date and Place
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Date: 24th March 2025", margin, y);
    y += 7;
    doc.text("Place: Payyapilly kadavil, Koduvazhanga, Neericode P.O., Alangad", margin, y);
    y += 10;

    // Sections
    const sections = textAreaValue.split("\n\n"); // Split by double newline for paragraphs
    sections.forEach((section) => {
      const lines = section.split("\n");
      lines.forEach((line) => {
        if (line.match(/^\*\*\d\./)) {
          // Heading (e.g., **1. Declaration**)
          checkPageOverflow(10);
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(line.replace(/\*\*/g, ""), margin, y);
          y += 8;
        } else if (line.trim()) {
          // Regular text
          checkPageOverflow(20);
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          const splitText = doc.splitTextToSize(line.replace(/\*\*/g, ""), 180);
          splitText.forEach((textLine) => {
            checkPageOverflow(7);
            doc.text(textLine, margin, y);
            y += 7;
          });
        }
      });
      y += 5; // Space between sections
    });

    // Signature placeholders (assuming they come at the end)
    checkPageOverflow(40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Signed by Amith Sunil ____________________________", margin, y);
    y += 20;
    doc.text("Witness: ____________________________", margin, y);
    y += 7;
    doc.text("Hari", margin, y);
    y += 7;
    doc.text("Address: Abc", margin, y);

    // Output the PDF
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
            <div className="border p-4 rounded w-full mb-4 bg-white">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
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