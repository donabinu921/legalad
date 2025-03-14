import React from "react";

const FinancialAndProperty = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">7. Financial and Property Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Spousal Support Details</label>
      <textarea
        name="spousalSupportDetails"
        value={formData.spousalSupportDetails}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Alimony payment amount, frequency, and duration"
        required
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
        placeholder="Details of how assets and debts to be divided - movable and immovable properties, bank accounts, investments, etc."
        required
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Exchange of Articles</label>
      <textarea
        name="exchangeOfArticles"
        value={formData.exchangeOfArticles}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="4"
        placeholder="Details of how articles/jewellery/utensils are to be divided"
        required
      ></textarea>
    </div>
  </div>
);

export default FinancialAndProperty;
