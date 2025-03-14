import React from "react";

const Petitioner1Details = ({ formData, handleChange }) => (
  <div className="space-y-4 w-full">
    <h2 className="text-blue-600 text-xl font-medium mb-4">2. Personal Details of Petitioner 1 (Husband)</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Name</label>
      <input
        type="text"
        name="petitioner1Name"
        value={formData.petitioner1Name}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Age</label>
      <input
        type="number"
        name="petitioner1Age"
        value={formData.petitioner1Age}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Occupation</label>
      <input
        type="text"
        name="petitioner1Occupation"
        value={formData.petitioner1Occupation}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Address</label>
      <input
        type="text"
        name="petitioner1Address"
        value={formData.petitioner1Address}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Mobile No</label>
      <input
        type="number"
        name="petitioner1MobileNo"
        value={formData.petitioner1MobileNo}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        maxLength={8}
        minLength={8}
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Address</label>
      <input
        type="email"
        name="petitioner1EmailID"
        value={formData.petitioner1Address}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Pre-marital Status</label>
      <input
        type="text"
        name="petitioner1PreMaritalStatus"
        value={formData.petitioner1PremarialStatus}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        placeholder="Single/Married/Divorced/Widowed"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Religion</label>
      <input
        type="text"
        name="petitioner1Religion"
        value={formData.petitioner1Religion}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
      <label className="block text-sm font-medium text-gray-700">Petitioner 1 Permanent Residence</label>
      <input
        type="text"
        name="petitioner1PermanentResidence"
        value={formData.petitioner1PermanentResidence}
        onChange={handleChange}
        className="border p-2 rounded mb-4 w-full"
        required
      />
    </div>
  </div>
);

export default Petitioner1Details;
