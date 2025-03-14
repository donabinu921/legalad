import React from 'react'

const Advocates = ({formData,handleChange}) => {
  return (
    <div className='space-y-4 w-full'>
        <h2 className="text-blue-600 text-xl font-medium mb-4">10. Advocates Details</h2>
        <div>
        <label className="block text-sm font-medium text-gray-700">Advocate1 Name</label>
        <input
            type="text"
            name="advocate1Name"
            value={formData.advocate1Name}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
        />
        <label className="block text-sm font-medium text-gray-700">Advocate2 Name</label>
        <input
            type="text"
            name="advocate2Name"
            value={formData.advocate2Name}
            onChange={handleChange}
            className="border p-2 rounded mb-4 w-full"
            required
        />
        </div>
    </div>
  )
}

export default Advocates