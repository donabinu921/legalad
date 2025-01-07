import React from "react";

const PropertyDetails = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">1. Property Details</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Property Address</label>
      <textarea
        name="propertyAddress"
        value={formData.propertyAddress}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Enter the full address of the property"
        required
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Type of Property</label>
      <input
        type="text"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="e.g., Apartment, House, Office Space"
        required
      />
    </div>
  </div>
);

export default PropertyDetails;
