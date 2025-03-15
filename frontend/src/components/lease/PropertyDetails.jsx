import React from "react";

const PropertyDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">1. Property Details</h2>
    <div>
      <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
        Property Address
      </label>
      <textarea
        id="propertyAddress"
        name="propertyAddress"
        value={formData.propertyAddress}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="3"
        placeholder="Enter the full address of the property (e.g., 789 Pine Lane, Anytown, CA 91234)"
        required
      />
    </div>
    <div>
      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
        Type of Property
      </label>
      <select
        id="propertyType"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">Select Property Type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Office Space">Office Space</option>
        <option value="Commercial">Commercial</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>
);

export default PropertyDetails;