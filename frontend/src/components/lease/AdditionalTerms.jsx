import React from "react";

const AdditionalTerms = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">5. Additional Terms</h2>
    <textarea
      name="additionalTerms"
      value={formData.additionalTerms}
      onChange={handleChange}
      className="border p-2 rounded mb-4 w-full"
      rows="3"
      placeholder="Specify any additional terms or conditions for the lease"
    ></textarea>
  </div>
);

export default AdditionalTerms;
