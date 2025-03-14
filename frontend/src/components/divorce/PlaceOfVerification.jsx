import React from 'react';

// List of Family Court locations in Kerala (sorted alphabetically)
const familyCourtLocations = [
  "Alappuzha",
  "Aluva",
  "Ernakulam",
  "Idukki (Thodupuzha)",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "North Paravur",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad (Kalpetta)",
  "Adoor",
  "Kunnamkulam",
  "Neyyattinkara",
  "Punalur",
  "Vadakara"
].sort();

const PlaceOfVerification = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-blue-600 text-xl font-medium mb-4">1. Place of Verification</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Select a family court</label>
        <select
          name="verificationPlace"
          value={formData.verificationPlace || ""}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        >
          <option value="">Select a Family Court</option>
          {familyCourtLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlaceOfVerification;