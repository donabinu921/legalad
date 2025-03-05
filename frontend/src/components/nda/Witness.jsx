import React from 'react'

const Witness = ({formData,handleChange}) => {
  return (
    <div className='space-y-4 w-full'>
        <h2 className="text-blue-600 text-xl font-medium mb-4">6. Witnesses Details</h2>
        <div>
        <label className="block text-sm font-medium text-gray-700">Witness Name</label>
        <input
            type="text"
            name="witnessName"
            value={formData.witnessName}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
        />
        <label className="block text-sm font-medium text-gray-700">Witness Address</label>
        <input
            type="text"
            name="witnessAddress"
            value={formData.witnessAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
        />
        <label className="block text-sm font-medium text-gray-700">Additional Witness Name</label>
        <input
            type="text"
            name="addWitnessName"
            value={formData.addWitnessName}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            placeholder='optional'
        />
        <label className="block text-sm font-medium text-gray-700">Additional Witness Address</label>
        <input
            type="text"
            name="addWitnessAddress"
            value={formData.addWitnessAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            placeholder='optional'
        />
        </div>
    </div>
  )
}

export default Witness