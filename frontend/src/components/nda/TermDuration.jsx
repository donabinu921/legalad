import React from "react";

const TermDuration = ({ formData, handleChange }) => {
  const handleTermChange = (e) => {
    const { value } = e.target;

    handleChange({ target: { name: "termDurationOption", value } });

    if (value !== "Specify date") {
      handleChange({ target: { name: "termDuration", value } });
    } else {
      handleChange({ target: { name: "termDuration", value: "" } });
    }
  };

  const handleDateChange = (e) => {
    handleChange({ target: { name: "termDuration", value: e.target.value } });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-blue-600 text-xl font-medium mb-4">
        5. Term Duration
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          How long will the obligations created by this Non-Disclosure Agreement last?
        </label>
        <select
          name="termDurationOption"
          value={formData.termDurationOption || "Indefinitely"}
          onChange={handleTermChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="Indefinitely">Indefinitely</option>
          <option value="Specify date">Specify date</option>
        </select>

        {formData.termDurationOption === "Specify date" && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Select an end date:
            </label>
            <input
              type="date"
              name="termDuration"
              value={formData.termDuration || ""}
              onChange={handleDateChange}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Next day
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TermDuration;
