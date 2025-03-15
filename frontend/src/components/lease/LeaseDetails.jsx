import React from "react";

const LeaseDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Lease Details</h2>
    <div>
      <label htmlFor="leaseStartDate" className="block text-sm font-medium text-gray-700">
        Lease Start Date
      </label>
      <input
        id="leaseStartDate"
        type="date"
        name="leaseStartDate"
        value={formData.leaseStartDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="leaseEndDate" className="block text-sm font-medium text-gray-700">
        Lease End Date
      </label>
      <input
        id="leaseEndDate"
        type="date"
        name="leaseEndDate"
        value={formData.leaseEndDate}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div>
      <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
        Monthly Rent (INR)
      </label>
      <input
        id="monthlyRent"
        type="number"
        name="monthlyRent"
        value={formData.monthlyRent}
        onChange={handleChange}
        min="0"
        step="0.01"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 1500.00"
        required
      />
    </div>
    <div>
      <label htmlFor="rentDueDay" className="block text-sm font-medium text-gray-700">
        Rent Due Day (Day of Month)
      </label>
      <input
        id="rentDueDay"
        type="number"
        name="rentDueDay"
        value={formData.rentDueDay}
        onChange={handleChange}
        min="1"
        max="31"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 1"
        required
      />
    </div>
    <div>
      <label htmlFor="lateFeeGracePeriod" className="block text-sm font-medium text-gray-700">
        Late Fee Grace Period (Days)
      </label>
      <input
        id="lateFeeGracePeriod"
        type="number"
        name="lateFeeGracePeriod"
        value={formData.lateFeeGracePeriod}
        onChange={handleChange}
        min="0"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 3"
      />
    </div>
    <div>
      <label htmlFor="lateFeeAmount" className="block text-sm font-medium text-gray-700">
        Late Fee Amount (INR)
      </label>
      <input
        id="lateFeeAmount"
        type="number"
        name="lateFeeAmount"
        value={formData.lateFeeAmount}
        onChange={handleChange}
        min="0"
        step="0.01"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 50.00"
      />
    </div>
    <div>
      <label htmlFor="additionalDailyLateFee" className="block text-sm font-medium text-gray-700">
        Additional Daily Late Fee (INR)
      </label>
      <input
        id="additionalDailyLateFee"
        type="number"
        name="additionalDailyLateFee"
        value={formData.additionalDailyLateFee}
        onChange={handleChange}
        min="0"
        step="0.01"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 10.00"
      />
    </div>
    <div>
      <label htmlFor="securityDepositAmount" className="block text-sm font-medium text-gray-700">
        Security Deposit Amount (INR)
      </label>
      <input
        id="securityDepositAmount"
        type="number"
        name="securityDepositAmount"
        value={formData.securityDepositAmount}
        onChange={handleChange}
        min="0"
        step="0.01"
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g., 1500.00"
        required
      />
    </div>
  </div>
);

export default LeaseDetails;