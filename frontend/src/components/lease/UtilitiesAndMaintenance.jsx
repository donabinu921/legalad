import React from "react";

const UtilitiesAndMaintenance = ({ formData, handleChange, handleUtilitiesChange }) => {
  const utilityOptions = ["Water", "Sewer", "Garbage", "Electricity", "Gas", "Internet"];

  const handleUtilityCheckboxChange = (e, fieldName) => {
    const { value, checked } = e.target;
    const currentValues = formData[fieldName] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);
    handleUtilitiesChange(fieldName, newValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-blue-600 text-xl font-medium mb-4">4. Utilities and Maintenance</h2>

      {/* Landlord Utilities Responsibility */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Landlord's Utilities Responsibility
        </label>
        <div className="space-y-2">
          {utilityOptions.map((utility) => (
            <label key={utility} className="flex items-center">
              <input
                type="checkbox"
                name="landlordUtilitiesResponsibility"
                value={utility}
                checked={formData.landlordUtilitiesResponsibility.includes(utility)}
                onChange={(e) => handleUtilityCheckboxChange(e, "landlordUtilitiesResponsibility")}
                className="mr-2 focus:ring-blue-500"
              />
              {utility}
            </label>
          ))}
        </div>
      </div>

      {/* Tenant Utilities Responsibility */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tenant's Utilities Responsibility
        </label>
        <div className="space-y-2">
          {utilityOptions.map((utility) => (
            <label key={utility} className="flex items-center">
              <input
                type="checkbox"
                name="tenantUtilitiesResponsibility"
                value={utility}
                checked={formData.tenantUtilitiesResponsibility.includes(utility)}
                onChange={(e) => handleUtilityCheckboxChange(e, "tenantUtilitiesResponsibility")}
                className="mr-2 focus:ring-blue-500"
              />
              {utility}
            </label>
          ))}
        </div>
      </div>

      {/* Maintenance Responsibility */}
      <div>
        <label htmlFor="maintenanceResponsibility" className="block text-sm font-medium text-gray-700">
          Maintenance Responsibility
        </label>
        <textarea
          id="maintenanceResponsibility"
          name="maintenanceResponsibility"
          value={formData.maintenanceResponsibility}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="e.g., 'Landlord responsible for structural repairs; Tenant responsible for yard maintenance.'"
        />
      </div>

      {/* Pet Policy */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Are Pets Allowed?</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="arePetsAllowed"
              value="true"
              checked={formData.arePetsAllowed === true}
              onChange={() => handleChange({ target: { name: "arePetsAllowed", value: true } })}
              className="mr-2 focus:ring-blue-500"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="arePetsAllowed"
              value="false"
              checked={formData.arePetsAllowed === false}
              onChange={() => handleChange({ target: { name: "arePetsAllowed", value: false } })}
              className="mr-2 focus:ring-blue-500"
            />
            No
          </label>
        </div>
        {formData.arePetsAllowed && (
          <div>
            <label htmlFor="petRestrictions" className="block text-sm font-medium text-gray-700">
              Pet Restrictions
            </label>
            <textarea
              id="petRestrictions"
              name="petRestrictions"
              value={formData.petRestrictions}
              onChange={handleChange}
              className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              placeholder="e.g., 'Only cats and small dogs (under 25 lbs) allowed. Maximum of 2 pets.'"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilitiesAndMaintenance;