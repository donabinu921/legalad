import React from "react";

const GroundsForDivorce = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Grounds for Divorce</h2>
    <textarea
      name="groundsForDivorce"
      value={formData.groundsForDivorce}
      onChange={handleChange}
      className="border p-2 rounded mb-4 w-full"
      rows="4"
      placeholder="Enter the legal grounds for divorce...(e.g. adultery, unreasonable behaviour, etc.)"
      required
    ></textarea>
  </div>
);

export default GroundsForDivorce;
