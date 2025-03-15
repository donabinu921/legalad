import React from "react";

const Witness = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 w-full">
      <h2 className="text-blue-600 text-xl font-medium mb-4">6. Witness Details</h2>

      {/* Witness 1 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">First Witness</h3>
        <div>
          <label htmlFor="witnessName" className="block text-sm font-medium text-gray-700">
            Witness Name
          </label>
          <input
            id="witnessName"
            type="text"
            name="witnessName"
            value={formData.witnessName}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Bob Williams"
            required
          />
        </div>
        <div>
          <label htmlFor="witnessAddress" className="block text-sm font-medium text-gray-700">
            Witness Address
          </label>
          <textarea
            id="witnessAddress"
            name="witnessAddress"
            value={formData.witnessAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="e.g., 987 Elm Street, Anytown, Mumbai, Maharashtra 400001"
            required
          />
        </div>
      </div>

      {/* Witness 2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Second Witness</h3>
        <div>
          <label htmlFor="addWitnessName" className="block text-sm font-medium text-gray-700">
            Additional Witness Name
          </label>
          <input
            id="addWitnessName"
            type="text"
            name="addWitnessName"
            value={formData.addWitnessName}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Jane Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="addWitnessAddress" className="block text-sm font-medium text-gray-700">
            Additional Witness Address
          </label>
          <textarea
            id="addWitnessAddress"
            name="addWitnessAddress"
            value={formData.addWitnessAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="e.g., 654 Cherry Street, Anytown, Mumbai, Maharashtra 400001"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Witness;