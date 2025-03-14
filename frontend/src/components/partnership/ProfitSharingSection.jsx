import React from "react";

const ProfitSharingSection = ({ formData, handleArrayChange, handleAddItem, handleRemoveItem }) => {
  const maxPartners = formData.partners.length; // Number of partners
  const canAdd = formData.profitSharing.length < maxPartners; // Can add if less than max
  const canRemove = formData.profitSharing.length > maxPartners; // Can remove if more than max (though this shouldn’t happen with proper initialization)

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-blue-600 text-xl font-medium mb-4">5. Profit Sharing (All Partners Required)</h2>
      {formData.profitSharing.map((partner, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Partner Name`}
              value={partner.name}
              onChange={(e) => handleArrayChange("profitSharing", index, "name", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Share Percentage`}
              value={partner.profitSharePercentage}
              onChange={(e) => handleArrayChange("profitSharing", index, "profitSharePercentage", e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          {canRemove && (
            <button
              type="button"
              onClick={() => handleRemoveItem("profitSharing", index)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition"
            >
              X
            </button>
          )}
        </div>
      ))}
      {canAdd && (
        <button
          type="button"
          onClick={() => handleAddItem("profitSharing")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Add Profit Sharing Partner
        </button>
      )}
    </div>
  );
};

export default ProfitSharingSection;