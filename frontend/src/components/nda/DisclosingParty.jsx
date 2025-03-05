import React from "react";

const DisclosingParty = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-blue-600 text-xl font-medium mb-4">2. Disclosing Party</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="disclosingPartyName"
            value={formData.disclosingPartyName || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="disclosingPartyAddress"
            value={formData.disclosingPartyAddress || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company address"
          />
        </div>
      </div>
    </div>
  );
};

export default DisclosingParty;
