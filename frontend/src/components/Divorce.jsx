import React, { useState } from "react";
import PersonalDetails from "./divorce/PersonalDetails";
import GroundsForDivorce from "./divorce/GroundsForDivorce";
import ChildrenAndCustody from "./divorce/ChildrenAndCustody";
import FinancialAndProperty from "./divorce/FinancialAndProperty";
import AdditionalTerms from "./divorce/AdditionalTerms";

const Divorce = ({setSystemInstruction,sendToGemini}) => {
  const [formData, setFormData] = useState({
    petitionerName: "",
    respondentName: "",
    marriageDate: "",
    separationDate: "",
    groundsForDivorce: "",
    childrenDetails: "",
    custodyAgreement: "",
    childSupportDetails: "",
    spousalSupportDetails: "",
    propertyDivision: "",
    additionalTerms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSystemInstruction(
      "Divorce system instruction here"
    );
    sendToGemini(
      `Divorce details here ${formData}`
    );
  };


  return (
    <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">Draft your Divorce Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <PersonalDetails formData={formData} handleChange={handleChange} />
        <GroundsForDivorce formData={formData} handleChange={handleChange} />
        <ChildrenAndCustody formData={formData} handleChange={handleChange} />
        <FinancialAndProperty formData={formData} handleChange={handleChange} />
        <AdditionalTerms formData={formData} handleChange={handleChange} />
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