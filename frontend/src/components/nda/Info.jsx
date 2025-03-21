import React from "react";

const Info = ({ formData, handleChange }) => {
  const options = [
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
];

  return (
    <div className="space-y-4">
      <h2 className="text-blue-600 text-xl font-medium mb-4">1. Confidential Information</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="confidentialInformation"
              value={option}
              checked={formData.confidentialInformation.includes(option)}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label className="text-sm font-medium text-gray-700">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
