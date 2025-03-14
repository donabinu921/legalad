import React from "react";

const AdditionalDetailsSection = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">7. Additional Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Bank Operation Mode</label>
      <input
        type="text"
        name="bankOperationMode"
        placeholder="Bank Operation Mode (singly/jointly)"
        value={formData.bankOperationMode}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Additional Terms, if any</label>
      <textarea
        name="additionalTerms"
        placeholder="Additional Terms"
        value={formData.additionalTerms}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="4"
      />
    </div>
  </div>
);

export default AdditionalDetailsSection;