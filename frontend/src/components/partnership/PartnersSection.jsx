import React from "react";

const PartnersSection = ({ formData, handleArrayChange, handleAddItem, handleRemoveItem }) => {
  const canRemove = formData.partners.length > 2; // Check if more than 2 partners exist

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-blue-600 text-xl font-medium mb-4">1. Partners Details (Minimum 2 Partners)</h2>
      {formData.partners.map((partner, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Name`}
              value={partner.name}
              onChange={(e) => handleArrayChange("partners", index, "name", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Age`}
              value={partner.age}
              onChange={(e) => handleArrayChange("partners", index, "age", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Father's Name`}
              value={partner.fatherName}
              onChange={(e) => handleArrayChange("partners", index, "fatherName", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Residence`}
              value={partner.residence}
              onChange={(e) => handleArrayChange("partners", index, "residence", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          {canRemove && (
            <button
              type="button"
              onClick={() => handleRemoveItem("partners", index)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:scale-110 transition"
            >
              X
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddItem("partners")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Add Partner
      </button>
    </div>
  );
};

export default PartnersSection;