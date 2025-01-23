import React from "react";

const PartiesDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">3. Parties Involved</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Landlord's Name</label>
      <input
        type="text"
        name="landlordName"
        value={formData.landlordName}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the name of the landlord"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Landlord's Address</label>
      <input
        type="text"
        name="landlordAddress"
        value={formData.landlordAddress}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the address of the landlord"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Tenant's Name</label>
      <input
        type="text"
        name="tenantName"
        value={formData.tenantName}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the name of the tenant"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Tenant's Address</label>
      <input
        type="text"
        name="tenantAddress"
        value={formData.tenantAddress}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Enter the address of the tenant"
        required
      ></input>
    </div>
  </div>
);

export default PartiesDetails;
