import React, { useState } from "react";
import PersonalDetails from "./divorce/PersonalDetails";
import GroundsForDivorce from "./divorce/GroundsForDivorce";
import ChildrenAndCustody from "./divorce/ChildrenAndCustody";
import FinancialAndProperty from "./divorce/FinancialAndProperty";
import AdditionalTerms from "./divorce/AdditionalTerms";
import Witness from "./divorce/Witness";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Divorce = ({setSystemInstruction,sendToGemini}) => {
  const [formData, setFormData] = useState({
    dateOfDrafting: new Date().toISOString().split("T")[0],
    petitionerName: "",
    petitionerAddress: "",
    respondentName: "",
    respondentAddress: "",
    marriageDate: "",
    location: "",
    separationDate: "",
    groundsForDivorce: "Mutual Consent",
    childrenDetails: "",
    custodyAgreement: "",
    childSupportDetails: "",
    spousalSupportDetails: "",
    propertyDivision: "",
    additionalTerms: "",
    witnessName: "",
    witnessAddress: "",
    addWitnessName: "",
    addWitnessAddress: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.info("Generating Divorce Agreement...")
    setSystemInstruction(
      "You are a Divorce agreement creation agent. The user will provide the necessary details for drafting the agreement. Draft it based on the rules in India. It is understood that this is a sample and a lawyer should be consulted, so don't mention the need for a lawyer. Also don't provide legal advice just draft the agreement"
    );
    sendToGemini(
      ` Build it using these details ${JSON.stringify(formData)} Return the text in proper format and alignment `
    );
  }


  return (
    <div className="w-full mx-auto px-4 py-8">
      <ToastContainer/>
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">Draft your Divorce Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <PersonalDetails formData={formData} handleChange={handleChange} />
        <GroundsForDivorce formData={formData} handleChange={handleChange} />
        <ChildrenAndCustody formData={formData} handleChange={handleChange} />
        <FinancialAndProperty formData={formData} handleChange={handleChange} />
        <AdditionalTerms formData={formData} handleChange={handleChange} />
        <Witness formData={formData} handleChange={handleChange} />
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

export default Divorce;