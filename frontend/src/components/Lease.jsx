import React, { useState } from "react";
import PropertyDetails from "./lease/PropertyDetails";
import LeaseDetails from "./lease/LeaseDetails";
import PartiesDetails from "./lease/PartiesDetails";
import UtilitiesAndMaintenance from "./lease/UtilitiesAndMaintenance";
import AdditionalTerms from "./lease/AdditionalTerms";
import Witness from "./divorce/Advocates";

const Lease = ({ setSystemInstruction, sendToGemini }) => {
  const [formData, setFormData] = useState({
    dateOfAgreement: new Date().toISOString().split("T")[0],
    propertyAddress: "",
    propertyType: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    securityDeposit: "",
    landlordName: "",
    landlordAddress: "",
    tenantName: "",
    tenantAddress: "",
    utilitiesResponsibility: "",
    maintenanceResponsibility: "",
    additionalTerms: "",
    witnessName: "",
    witnessAddress: "",
    addWitnessName: "",
    addWitnessAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSystemInstruction(
      "You are a Lease agreement creation agent. The user will provide the necessary details for drafting the agreement. Draft it based on the rules in India. It is understood that this is a sample and a lawyer should be consulted, so don't mention the need for a lawyer. Also don't provide legal advice just draft the agreement"
    );
    sendToGemini(` Build it using these details ${JSON.stringify(formData)}`);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">
        Draft Lease Agreement
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <PropertyDetails formData={formData} handleChange={handleChange} />
        <LeaseDetails formData={formData} handleChange={handleChange} />
        <PartiesDetails formData={formData} handleChange={handleChange} />
        <UtilitiesAndMaintenance
          formData={formData}
          handleChange={handleChange}
        />
        <AdditionalTerms formData={formData} handleChange={handleChange} />
        <Witness formData={formData} handleChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
        >
          Draft Lease Agreement
        </button>
      </form>
    </div>
  );
};

export default Lease;
