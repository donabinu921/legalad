import React from "react";

const UtilitiesAndMaintenance = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h2 className="text-blue-600 text-xl font-medium mb-4">4. Utilities and Maintenance</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Utilities Responsibility</label>
      <textarea
        name="utilitiesResponsibility"
        value={formData.utilitiesResponsibility}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Specify who is responsible for utilities (e.g., electricity, water)"
        required
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Maintenance Responsibility</label>
      <textarea
        name="maintenanceResponsibility"
        value={formData.maintenanceResponsibility}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        rows="3"
        placeholder="Specify maintenance responsibilities for the landlord and tenant"
        required
      ></textarea>
    </div>
  </div>
);

export default UtilitiesAndMaintenance;
