import React from 'react'

const NonCompete = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-blue-600 text-xl font-medium mb-4">4. Non-Compete Clause and Non-Solicit Clause</h2>

      <div className="space-y-2">
      <div>
  {/* Non-Compete Clause */}
  <label className="block text-sm font-medium text-gray-700">
    Does this NDA prevent the receiving party from competing with the disclosing party?
  </label>
  <select
    name="nonCompeteClause"
    value={formData.nonCompeteClause || "No"}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>

  {/* Non-Compete Duration - Required if "Yes" */}
  {formData.nonCompeteClause === "Yes" && (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">
        How long is the Non-Compete period?
      </label>
      <input
        type="date"
        name="nonCompeteDuration"
        value={formData.nonCompeteDuration || ""}
        onChange={handleChange}
        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Next day
        required={formData.nonCompeteClause === "Yes"} // Required only if "Yes" is selected
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}
</div>

<div className="mt-4">
  {/* Non-Solicit Clause */}
  <label className="block text-sm font-medium text-gray-700">
    Will this agreement prevent the contractor from hiring the client's staff?
  </label>
  <select
    name="nonSolicitClause"
    value={formData.nonSolicitClause || "No"}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>

  {/* Non-Solicit Duration - Required if "Yes" */}
  {formData.nonSolicitClause === "Yes" && (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">
        How long is the Non-Solicit period?
      </label>
      <input
        type="date"
        name="nonSolicitDuration"
        value={formData.nonSolicitDuration || ""}
        onChange={handleChange}
        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Next day
        required={formData.nonSolicitClause === "Yes"} // Required only if "Yes" is selected
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}
</div>
      </div>
    </div>
  )
}

export default NonCompete