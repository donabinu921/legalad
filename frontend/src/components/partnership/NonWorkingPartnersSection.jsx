import React from "react";

const NonWorkingPartnersSection = ({ formData, handleArrayChange, handleAddItem, handleRemoveItem }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">4. Non-Working Partners</h2>
    {formData.nonWorkingPartners.map((partner, index) => (
      <div key={index} className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={`Name`}
            value={partner.name}
            onChange={(e) => handleArrayChange("nonWorkingPartners", index, "name", e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="button"
          onClick={() => handleRemoveItem("nonWorkingPartners", index)}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition"
        >
          X
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => handleAddItem("nonWorkingPartners")}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
    >
      Add Non-Working Partner
    </button>
  </div>
);

export default NonWorkingPartnersSection;