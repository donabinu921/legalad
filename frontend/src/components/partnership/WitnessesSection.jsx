import React from "react";

const WitnessesSection = ({ formData, handleArrayChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">6. Witnesses</h2>
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Witness 1 Name"
          value={formData.witnesses[0]?.name || ""}
          onChange={(e) => handleArrayChange("witnesses", 0, "name", e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Witness 2 Name"
          value={formData.witnesses[1]?.name || ""}
          onChange={(e) => handleArrayChange("witnesses", 1, "name", e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
    </div>
  </div>
);

export default WitnessesSection;