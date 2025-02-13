import React from "react";

const MarriageDetails = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">4. Marriage Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Marriage Date</label>
      <input
        type="date"
        name="marriageDate"
        value={formData.marriageDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />

    <label className="block text-sm font-medium text-gray-700">Marriage Location</label>
      <input
        type="text"
        name="marriageLocation"
        value={formData.marriageLocation}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Marriage Rites/Customs</label>
      <input
        type="text"
        name="marriageRites"
        value={formData.marriageRites}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Hindu, Christian, etc."
        required
      />

      <label className="block text-sm font-medium text-gray-700">Marriage Registration Details</label>
      <input
        type="text"
        name="marriageRegistrationDetails"
        value={formData.marriageRegistrationDetails}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Place of registration, registration number, etc."
        required
      />
    </div>
  </div>
);

export default MarriageDetails;