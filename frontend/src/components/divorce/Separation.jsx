import React from "react";

const Separation = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">4. Separation Details</h2>
    <div>
    <label className="block text-sm font-medium text-gray-700">Reason for Separation</label>
    <input
      name="reasonForSeparation"
      value="Mutual Consent"
      className="border p-2 rounded mb-4 w-full"
      readOnly
    />
    <label className="block text-sm font-medium text-gray-700">Separation date</label>
    <input
  type="date"
  name="separationDate"
  value={formData.separationDate}
  className="border p-2 rounded mb-4 w-full"
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]} // Sets max to current date
/>
    </div>
  </div>
);

export default Separation;
