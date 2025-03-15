import React from "react";

const PartiesDetails = ({ formData, handleChange }) => (
  <div className="space-y-6">
    <h2 className="text-blue-600 text-xl font-medium mb-4">3. Parties Involved</h2>
    
    {/* Landlord Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Landlord</h3>
      <div>
        <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700">
          Landlord's Name
        </label>
        <input
          id="landlordName"
          type="text"
          name="landlordName"
          value={formData.landlordName}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., John Smith"
          required
        />
      </div>
      <div>
        <label htmlFor="landlordAddress" className="block text-sm font-medium text-gray-700">
          Landlord's Address
        </label>
        <textarea
          id="landlordAddress"
          name="landlordAddress"
          value={formData.landlordAddress}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="e.g., 123 Main Street, Anytown, Mumbai, Maharashtra 400001"
          required
        />
      </div>
      <div>
        <label htmlFor="landlordSignature" className="block text-sm font-medium text-gray-700">
          Landlord's Signature
        </label>
        <input
          id="landlordSignature"
          type="text"
          name="landlordSignature"
          value={formData.landlordSignature}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Digital Signature or Full Name"
          required
        />
      </div>
    </div>

    {/* Tenant Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Tenant</h3>
      <div>
        <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
          Tenant's Name
        </label>
        <input
          id="tenantName"
          type="text"
          name="tenantName"
          value={formData.tenantName}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Alice Johnson"
          required
        />
      </div>
      <div>
        <label htmlFor="tenantAddress" className="block text-sm font-medium text-gray-700">
          Tenant's Address
        </label>
        <textarea
          id="tenantAddress"
          name="tenantAddress"
          value={formData.tenantAddress}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="e.g., 456 Oak Avenue, Anytown, Mumbai, Maharashtra 400001"
          required
        />
      </div>
      <div>
        <label htmlFor="tenantSignature" className="block text-sm font-medium text-gray-700">
          Tenant's Signature
        </label>
        <input
          id="tenantSignature"
          type="text"
          name="tenantSignature"
          value={formData.tenantSignature}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Digital Signature or Full Name"
          required
        />
      </div>
    </div>
  </div>
);

export default PartiesDetails;