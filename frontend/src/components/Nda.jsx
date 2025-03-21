import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Info from "./nda/Info";
import DisclosingParty from "./nda/DisclosingParty";
import ReceivingParty from "./nda/ReceivingParty";
import NonCompete from "./nda/NonCompete";
import TermDuration from "./nda/TermDuration";
import Witness from "./nda/Witness";

const NDA = ({ setSystemInstruction, sendToGemini }) => {
  const [formData, setFormData] = useState({
    dateOfDrafting: new Date().toISOString().split("T")[0],
    confidentialInformation:[
      "Business Operations",
      "Customer Data",
      "Services Provided",
      "Intellectual Property",
      "Product Information",
      "Production Processes",
      "Accounting and Finances",
      "Marketing and Development",
      "Computer Technology and Security",
      "Third Party Information"
  ],
    disclosingPartyName: "",
    disclosingPartyAddress: "",
    receivingPartyName: "",
    receivingPartyAddress: "",
    nonCompeteClause: "No",
    nonCompeteDuration: "",
    nonSolicitClause: "No",
    nonSolicitDuration: "",
    termDuration: "Indefinitely",
    witnessName: "",
    witnessAddress: "",
    addWitnessName: "",
    addWitnessAddress: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          confidentialInformation: checked
            ? [...prevState.confidentialInformation, value] // Add to array
            : prevState.confidentialInformation.filter((item) => item !== value), // Remove from array
        };
      }
      return { ...prevState, [name]: value }; // Handle text inputs
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Generating NDA Agreement...");
    setSystemInstruction(
      "You are an NDA agreement creation agent. The user will provide the necessary details for drafting the agreement. Draft it based on standard legal practices. It is understood that this is a sample and a lawyer should be consulted, so don't mention the need for a lawyer. Also, don't provide legal advice; just draft the agreement."
    );
    sendToGemini(
      `Build it using these details ${JSON.stringify(formData)}. Return the text in proper format and alignment.`
    );
    console.log(formData);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">
        Draft your Non-Disclosure Agreement
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <input type="checkbox" checked readOnly />
        <label>
          This agreement is made and entered into on {formData.dateOfDrafting} (YYYY/MM/DD)
        </label> <br />
        <input type="checkbox" checked readOnly />
        <label>
          This agreement is between the disclosing party (client) and the receiving party (contractor).
        </label>
        <Info formData={formData} handleChange={handleChange} />
        <DisclosingParty formData={formData} handleChange={handleChange} />
        <ReceivingParty formData={formData} handleChange={handleChange} />
        <NonCompete formData={formData} handleChange={handleChange} />
        <TermDuration formData={formData} handleChange={handleChange} />
        <Witness formData={formData} handleChange={handleChange}/>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
        >
          Draft Agreement
        </button>
      </form>
    </div>
  );
};

export default NDA;
