import React from "react";

const Petitioner2Details = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Personal Details of Petitioner 2</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Name</label>
      <input
        type="text"
        name="petitioner2Name"
        value={formData.petitioner2Name}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Age</label>
      <input
        type="number"
        name="petitioner2Age"
        value={formData.petitioner2Age}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Occupation</label>
      <input
        type="text"
        name="petitioner2Occupation"
        value={formData.petitioner2Occupation}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Address</label>
      <input
        type="text"
        name="petitioner2Address"
        value={formData.petitioner2Address}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Mobile No</label>
      <input
        type="number"
        name="petitioner2MobileNo"
        value={formData.petitioner2MobileNo}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        maxLength={8}
        minLength={8}
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Address</label>
      <input
        type="email"
        name="petitioner2EmailID"
        value={formData.petitioner2Address}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Pre-marital Status</label>
      <input
        type="text"
        name="petitioner2PreMaritalStatus"
        value={formData.petitioner2PremarialStatus}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Single/Married/Divorced/Widowed"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Religion</label>
      <input
        type="text"
        name="petitioner2Religion"
        value={formData.petitioner2Religion}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 2 Permanent Residence</label>
      <input
        type="text"
        name="petitioner2PermanentResidence"
        value={formData.petitioner2PermanentResidence}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
  </div>
);

export default Petitioner2Details;
