import React from "react";

const FinancialAndProperty = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">4. Financial and Property Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Spousal Support Details</label>
      <textarea
        name="spousalSupportDetails"
        value={formData.spousalSupportDetails}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Alimony payment amount, frequency, and duration"
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Property Division</label>
      <textarea
        name="propertyDivision"
        value={formData.propertyDivision}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="4"
        placeholder="Details of how assets and debts to be divided"
      ></textarea>
    </div>
  </div>
);

export default FinancialAndProperty;
