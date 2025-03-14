import React, { useState } from "react";
import PlaceOfVerification from "./divorce/PlaceOfVerification";
import Petitioner1Details from "./divorce/Petitioner1Details";
import Petitioner2Details from "./divorce/Petitioner2Details";
import Separation from "./divorce/Separation";
import MarriageDetails from "./divorce/MarriageDetails";
import ChildrenAndCustody from "./divorce/ChildrenAndCustody";
import FinancialAndProperty from "./divorce/FinancialAndProperty";
import AdditionalTerms from "./divorce/AdditionalTerms";
import Advocates from "./divorce/Advocates";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Divorce = ({ setSystemInstruction, sendToGemini }) => {
  const [formData, setFormData] = useState({
    dateOfVerification: new Date().toISOString().split("T")[0],
    verificationPlace: "",
    petitioner1Name: "",
    petitioner1Age: "",
    petitioner1Occupation: "",
    petitioner1Address: "",
    petitioner1MobileNo: "",
    petitioner1EmailID: "",
    petitioner1PreMaritalStatus: "",
    petitioner1Religion: "",
    petitioner1PermanentResidence: "",
    petitioner2Name: "",
    petitioner2MaidenName: "",
    petitioner2Age: "",
    petitioner2Occupation: "",
    petitioner2Address: "",
    petitioner2MobileNo: "",
    petitioner2EmailID: "",
    petitioner2PreMaritalStatus: "",
    petitioner2Religion: "",
    petitioner2PermanentResidence: "",
    reasonForSeparation: "Mutual Consent",
    separationDate: "",
    marriageDate: "",
    marriageLocation: "",
    marriageRites: "",
    marriageRegistrationDetails: "",
    childrenDetails: "",
    custodyAgreement: "",
    spousalSupportDetails: "",
    propertyDivision: "",
    exchangeOfArticles: "",
    pendingLitigations: "",
    withdrawalOfLitigations: "",
    additionalTerms: "",
    advocate1Name: "",
    advocate2Name: "",
    courtFeePaid: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          confidentialInformation: checked
            ? [...prevState.confidentialInformation, value] // Add to array
            : prevState.confidentialInformation.filter(
                (item) => item !== value
              ), // Remove from array
        };
      }
      return { ...prevState, [name]: value }; // Handle text inputs
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Generating Divorce Agreement...");
    setSystemInstruction(
      "You are a Divorce agreement creation agent. The user will provide the necessary details for drafting the agreement. Draft it based on the rules in India. It is understood that this is a sample and a lawyer should be consulted, so don't mention the need for a lawyer. Also don't provide legal advice just draft the agreement"
    );
    sendToGemini(
      ` Build it using these details ${JSON.stringify(
        formData
      )} Return the text in proper format and alignment `
    );
  };

  return (
    <div className="w-full mx-auto px-4 py-8 ">
      <ToastContainer />
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">
        Draft your Divorce Agreement
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <input type="checkbox" checked />
        <label>
          {" "}
          This agreement is made and verified on {
            formData.dateOfVerification
          }{" "}
          (YYYY/MM/DD)
        </label>
        <PlaceOfVerification formData={formData} handleChange={handleChange} />
        <Petitioner1Details formData={formData} handleChange={handleChange} />
        <Petitioner2Details formData={formData} handleChange={handleChange} />
        <Separation formData={formData} handleChange={handleChange} />
        <MarriageDetails formData={formData} handleChange={handleChange} />
        <ChildrenAndCustody formData={formData} handleChange={handleChange} />
        <FinancialAndProperty formData={formData} handleChange={handleChange} />
        <AdditionalTerms formData={formData} handleChange={handleChange} />
        <Advocates formData={formData} handleChange={handleChange} />
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
