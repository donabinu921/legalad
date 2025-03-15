import React from "react";

const AdditionalTerms = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">5. Additional Terms</h2>
    <div>
      <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700">
        Additional Terms and Conditions
      </label>
      <textarea
        id="additionalTerms"
        name="additionalTerms"
        value={formData.additionalTerms}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        placeholder="Specify additional terms or conditions for the lease, e.g., 'No smoking allowed inside the premises. Tenant is responsible for maintaining the yard.'"
      />
    </div>
  </div>
);

export default AdditionalTerms;