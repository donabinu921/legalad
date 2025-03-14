import React from "react";

const AdditionalTerms = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">8. Additional Terms</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Pending Litigations</label>
      <textarea
        name="pendingLitigations"
        value={formData.pendingLitigations}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Details of pending litigations, if any"
      ></textarea>
      <label className="block text-sm font-medium text-gray-700">Withdrawal of Litigations</label>
      <textarea
        name="withdrawalOfLitigations"
        value={formData.withdrawalOfLitigations}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Details of litigations to be withdrawn, if any"
      ></textarea>
      <label className="block text-sm font-medium text-gray-700">Additional Terms</label>
      <textarea
      name="additionalTerms"
      value={formData.additionalTerms}
      onChange={handleChange}
      className="border p-2 rounded mb-4 w-full"
      rows="3"
      placeholder="Other terms or conditions, if any, such as child support, etc."
    ></textarea>
    </div>
  </div>
);

export default AdditionalTerms;
