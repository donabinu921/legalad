import React from "react";

const ReceivingParty = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-blue-600 text-xl font-medium mb-4">3. Receiving Party</h2>

      <div className="space-y-2">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="receivingPartyName"
            value={formData.receivingPartyName || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="receivingPartyAddress"
            value={formData.receivingPartyAddress || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company address"
          />
        </div>
      </div>
    </div>
  );
};

export default ReceivingParty;
