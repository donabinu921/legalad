import React, { useState } from "react";
import Petitioner1Details from "./divorce/Petitioner1Details";
import Petitioner2Details from "./divorce/Petitioner2Details";
import Separation from "./divorce/Separation";
import MarriageDetails from "./divorce/MarriageDetails";
import ChildrenAndCustody from "./divorce/ChildrenAndCustody";
import FinancialAndProperty from "./divorce/FinancialAndProperty";
import AdditionalTerms from "./divorce/AdditionalTerms";
import Witness from "./divorce/Witness";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Divorce = ({setSystemInstruction,sendToGemini}) => {
  const [formData, setFormData] = useState({
    "dateOfDrafting": new Date().toISOString().split("T")[0],
    "petitioner1Name": "",
    "petitioner1Age": "",
    "petitioner1Occupation": "",
    "petitioner1Address": "",
    "petitioner1MobileNo": "",
    "petitioner1EmailID": "",
    "petitioner1PreMaritalStatus": "",
    "petitioner1Religion": "",
    "petitioner1PermanentResidence": "",
    "petitioner2Name": "",
    "petitioner2Age": "",
    "petitioner2Occupation": "",
    "petitioner2Address": "",
    "petitioner2MobileNo": "",
    "petitioner2EmailID": "",
    "petitioner2PreMaritalStatus": "",
    "petitioner2Religion": "",
    "petitioner2PermanentResidence": "",
    "reasonForSeparation": "",
    "separationDate": "",
    "marriageDate": "",
    "marriageLocation": "",
    "marriageRites": "",
    "marriageRegistrationDetails": "",
    "childrenDetails": "",
    "custodyAgreement": "",
    "childSupportDetails": "",
    "spousalSupportDetails": "",
    "propertyDivision": "",
    "pendingLitigations": "",
    "withdrawalOfLitigations": "",
    "additionalTerms": "",
    "witnessName": "",
    "witnessAddress": "",
    "addWitnessName": "",
    "addWitnessAddress": "",
    "courtFeePaid": true
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
    <div className="w-full mx-auto px-4 py-8 ">
      <ToastContainer/>
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">Draft your Divorce Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <input type="checkbox" checked/>
        <label>  This agreement is made and entered into on {formData.dateOfDrafting} (YYYY/MM/DD)</label>
        <Petitioner1Details formData={formData} handleChange={handleChange} />
        <Petitioner2Details formData={formData} handleChange={handleChange} />
        <Separation formData={formData} handleChange={handleChange} />
        <MarriageDetails formData={formData} handleChange={handleChange} />
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