import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PartnersSection from './partnership/PartnersSection';
import BusinessDetailsSection from './partnership/BusinessDetailsSection';
import WorkingPartnersSection from './partnership/WorkingPartnersSection';
import ProfitSharingSection from './partnership/ProfitSharingSection';
import NonWorkingPartnersSection from './partnership/NonWorkingPartnersSection';
import WitnessesSection from './partnership/WitnessesSection';
import AdditionalDetailsSection from './partnership/AdditionalDetailsSection';

const Partnership = ({ setSystemInstruction, sendToGemini }) => {
  const [formData, setFormData] = useState({
    dateOfExecution: new Date().toISOString().split("T")[0],
    executionPlace: "",
    partners: [{ name: "", age: "", fatherName: "", residence: "" }, { name: "", age: "", fatherName: "", residence: "" }],
    businessType: "",
    firmName: "",
    principalPlaceOfBusiness: "",
    originalDeedDate: "",
    workingPartners: [{ name: "", remunerationPercentage: "" }],
    profitSharing: [{ name: "", profitSharePercentage: "" }, { name: "", profitSharePercentage: "" }],
    bankOperationMode: "",
    nonWorkingPartners: [{ name: "" }],
    witnesses: [{ name: "" }, { name: "" }],
    additionalTerms: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return { ...prev, [section]: updatedArray };
    });
  };

  const handleAddItem = (section) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [section]: [...prev[section], section === "partners" 
          ? { name: "", age: "", fatherName: "", residence: "" }
          : { name: "", [section === "workingPartners" ? "remunerationPercentage" : "profitSharePercentage"]: "" }]
      };
      if (section === "partners") {
        newData.profitSharing = Array(newData.partners.length).fill().map(() => ({ name: "", profitSharePercentage: "" }));
      }
      return newData;
    });
  };
  
  const handleRemoveItem = (section, index) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      };
      if (section === "partners") {
        newData.profitSharing = Array(newData.partners.length).fill().map(() => ({ name: "", profitSharePercentage: "" }));
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Generating Partnership Deed...");
    setSystemInstruction(
      "You are a Partnership Deed creation agent. The user will provide the necessary details for drafting the agreement. Draft it based on the rules in India. It is understood that this is a sample and a lawyer should be consulted, so don't mention the need for a lawyer. Also don't provide legal advice just draft the agreement"
    );
    sendToGemini(
      ` Build it using these details ${JSON.stringify(
        formData
      )} Return the text in proper format and alignment `
    );
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">Partnership Deed Form</h1>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <PartnersSection formData={formData} handleArrayChange={handleArrayChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
        <BusinessDetailsSection formData={formData} handleChange={handleChange} />
        <WorkingPartnersSection formData={formData} handleArrayChange={handleArrayChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
        <NonWorkingPartnersSection formData={formData} handleArrayChange={handleArrayChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
        <ProfitSharingSection formData={formData} handleArrayChange={handleArrayChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
        <WitnessesSection formData={formData} handleArrayChange={handleArrayChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
        <AdditionalDetailsSection formData={formData} handleChange={handleChange} />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
          >
            Draft Deed
          </button>
        </div>
      </form>
    </div>
  );
};

export default Partnership;