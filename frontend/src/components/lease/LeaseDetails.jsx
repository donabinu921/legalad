import React from "react";

const LeaseDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Lease Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Lease Start Date</label>
      <input
        type="date"
        name="leaseStartDate"
        value={formData.leaseStartDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Lease End Date</label>
      <input
        type="date"
        name="leaseEndDate"
        value={formData.leaseEndDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
      <input
        type="number"
        name="monthlyRent"
        value={formData.monthlyRent}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the rent amount in INR"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Security Deposit</label>
      <input
        type="number"
        name="securityDeposit"
        value={formData.securityDeposit}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the security deposit amount"
        required
      />
    </div>
  </div>
);

export default LeaseDetails;
