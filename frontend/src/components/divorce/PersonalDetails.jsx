import React from "react";

const PersonalDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">1. Personal Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Petitioner Name</label>
      <input
        type="text"
        name="petitionerName"
        value={formData.petitionerName}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Respondent Name</label>
      <input
        type="text"
        name="respondentName"
        value={formData.respondentName}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Date of Marriage</label>
      <input
        type="date"
        name="marriageDate"
        value={formData.marriageDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Date of Separation</label>
      <input
        type="date"
        name="separationDate"
        value={formData.separationDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
      />
    </div>
  </div>
);

export default PersonalDetails;
