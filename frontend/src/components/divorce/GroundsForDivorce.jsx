import React from "react";

const GroundsForDivorce = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <label className="text-blue-600 text-xl font-medium mb-4">2. Grounds for Divorce</label>
    <input
      name="groundsForDivorce"
      value={formData.groundsForDivorce}
      className="border p-2 rounded mb-4 w-full"
      rows="4"
      readOnly
    />
  </div>
);

export default GroundsForDivorce;
