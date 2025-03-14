import React from "react";

const BusinessDetailsSection = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Business Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Date of Execution</label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        name="dateOfExecution"
        placeholder="Date of Execution"
        value={formData.dateOfExecution}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Place of Execution</label>
      <input
        type="text"
        name="executionPlace"
        placeholder="Place of Execution"
        value={formData.executionPlace}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Business Type</label>
      <input
        type="text"
        name="businessType"
        placeholder="Business Type"
        value={formData.businessType}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Firm Name</label>
      <input
        type="text"
        name="firmName"
        placeholder="Firm Name"
        value={formData.firmName}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Principal Place of Business</label>
      <input
        type="text"
        name="principalPlaceOfBusiness"
        placeholder="Principal Place of Business"
        value={formData.principalPlaceOfBusiness}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Original Deed Date</label>
      <input
        type="date"
        name="originalDeedDate"
        placeholder="Original Deed Date"
        value={formData.originalDeedDate}
        onChange={handleChange}
        max={formData.dateOfExecution} // Disable dates after dateOfExecution
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
  </div>
);

export default BusinessDetailsSection;