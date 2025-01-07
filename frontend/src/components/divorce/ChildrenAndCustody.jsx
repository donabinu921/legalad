import React from "react";

const ChildrenAndCustody = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">3. Children and Custody Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Children Details</label>
      <textarea
        name="childrenDetails"
        value={formData.childrenDetails}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Names and ages of children, if applicable"
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Custody Agreement</label>
      <textarea
        name="custodyAgreement"
        value={formData.custodyAgreement}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Details of custody arrangement (e.g., sole, joint)"
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Child Support Details</label>
      <textarea
        name="childSupportDetails"
        value={formData.childSupportDetails}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Child support payment amount, frequency, and duration"
      ></textarea>
    </div>
  </div>
);

export default ChildrenAndCustody;
