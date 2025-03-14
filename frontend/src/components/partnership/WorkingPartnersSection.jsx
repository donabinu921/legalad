import React from "react";

const WorkingPartnersSection = ({ formData, handleArrayChange, handleAddItem, handleRemoveItem }) => {
  const canRemove = formData.workingPartners.length > 1; // Check if more than 1 working partner exists

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-blue-600 text-xl font-medium mb-4">3. Working Partners</h2>
      {formData.workingPartners.map((partner, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Name`}
              value={partner.name}
              onChange={(e) => handleArrayChange("workingPartners", index, "name", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Remuneration Percentage`}
              value={partner.remunerationPercentage}
              onChange={(e) => handleArrayChange("workingPartners", index, "remunerationPercentage", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          {canRemove && (
            <button
              type="button"
              onClick={() => handleRemoveItem("workingPartners", index)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition"
            >
              X
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddItem("workingPartners")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Add Working Partner
      </button>
    </div>
  );
};

export default WorkingPartnersSection;