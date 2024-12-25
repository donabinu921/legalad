import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Will = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        testatorName: '',
        testatorAddress: '',
        executorName: '',
        executorAddress: '',
        beneficiaries: [{ name: '', relation: '', share: '' }],
        specificBequests: [{ item: '', recipient: '' }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBeneficiaryChange = (index, field, value) => {
        const updatedBeneficiaries = [...formData.beneficiaries];
        updatedBeneficiaries[index][field] = value;
        setFormData({ ...formData, beneficiaries: updatedBeneficiaries });
    };

    const handleBequestChange = (index, field, value) => {
        const updatedBequests = [...formData.specificBequests];
        updatedBequests[index][field] = value;
        setFormData({ ...formData, specificBequests: updatedBequests });
    };

    const addBeneficiary = () => {
        setFormData({
            ...formData,
            beneficiaries: [...formData.beneficiaries, { name: '', relation: '', share: '' }],
        });
    };

    const deleteBeneficiary = (index) => {
        const updatedBeneficiaries = formData.beneficiaries.filter((_, i) => i !== index);
        setFormData({ ...formData, beneficiaries: updatedBeneficiaries });
    };

    const addBequest = () => {
        setFormData({
            ...formData,
            specificBequests: [...formData.specificBequests, { item: '', recipient: '' }],
        });
    };

    const deleteBequest = (index) => {
        const updatedBequests = formData.specificBequests.filter((_, i) => i !== index);
        setFormData({ ...formData, specificBequests: updatedBequests });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Will Form Data:', formData);
        // Process form data or send it to the backend
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-center text-blue-600 text-3xl font-bold my-12">Draft Your Will</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="w-full flex flex-col">
                    <h2 className="text-blue-600 text-xl font-medium mb-4">Testator Details (Who is making this will?)</h2>
                    <input
                        type="text"
                        name="testatorName"
                        placeholder="Full Name"
                        value={formData.testatorName}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded mb-4"
                    />
                    <input
                        type="text"
                        name="testatorAddress"
                        placeholder="Address"
                        value={formData.testatorAddress}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded mb-4"
                    />

                    <h2 className="text-blue-600 text-xl font-medium mb-4">Executor Details</h2>
                    <input
                        type="text"
                        name="executorName"
                        placeholder="Executor's Full Name"
                        value={formData.executorName}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded mb-4"
                    />
                    <input
                        type="text"
                        name="executorAddress"
                        placeholder="Executor's Address"
                        value={formData.executorAddress}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded mb-4"
                    />

                    <h2 className="text-blue-600 text-xl font-medium mb-4">Beneficiaries</h2>
                    {formData.beneficiaries.map((beneficiary, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={beneficiary.name}
                                onChange={(e) => handleBeneficiaryChange(index, 'name', e.target.value)}
                                required
                                className="border p-2 rounded flex-1"
                            />
                            <input
                                type="text"
                                placeholder="Relation"
                                value={beneficiary.relation}
                                onChange={(e) => handleBeneficiaryChange(index, 'relation', e.target.value)}
                                required
                                className="border p-2 rounded flex-1"
                            />
                            <input
                                type="text"
                                placeholder="Share (%)"
                                value={beneficiary.share}
                                onChange={(e) => handleBeneficiaryChange(index, 'share', e.target.value)}
                                required
                                className="border p-2 rounded flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => deleteBeneficiary(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                &#x2715;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addBeneficiary}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition mb-6"
                    >
                        Add Beneficiary
                    </button>

                    <h2 className="text-blue-600 text-xl font-medium mb-4">Specific Bequests</h2>
                    {formData.specificBequests.map((bequest, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Item (e.g., Jewelry, Car)"
                                value={bequest.item}
                                onChange={(e) => handleBequestChange(index, 'item', e.target.value)}
                                required
                                className="border p-2 rounded flex-1"
                            />
                            <input
                                type="text"
                                placeholder="Recipient"
                                value={bequest.recipient}
                                onChange={(e) => handleBequestChange(index, 'recipient', e.target.value)}
                                required
                                className="border p-2 rounded flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => deleteBequest(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                &#x2715;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addBequest}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition mb-6"
                    >
                        Add Bequest
                    </button>
                </div>
                <button
                    type="submit"
                    className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Will;