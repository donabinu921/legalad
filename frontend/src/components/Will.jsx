import React, {useState} from 'react'
import "../styles/Will.css"
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
    
      const addBequest = () => {
        setFormData({
          ...formData,
          specificBequests: [...formData.specificBequests, { item: '', recipient: '' }],
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Will Form Data:', formData);
        // Process form data or send it to the backend
      };
    
      return (
        <div className="will-draft-form">
          <h1>Draft Your Will</h1>
          <form onSubmit={handleSubmit}>
            <div className='will-form-content'>
            <h2>Testator Details (Who is making this will?)</h2>
            <input
              type="text"
              name="testatorName"
              placeholder="Full Name"
              value={formData.testatorName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="testatorAddress"
              placeholder="Address"
              value={formData.testatorAddress}
              onChange={handleChange}
              required
            />
    
            <h2>Executor Details</h2>
            <input
              type="text"
              name="executorName"
              placeholder="Executor's Full Name"
              value={formData.executorName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="executorAddress"
              placeholder="Executor's Address"
              value={formData.executorAddress}
              onChange={handleChange}
              required
            />
    
            <h2>Beneficiaries</h2>
            {formData.beneficiaries.map((beneficiary, index) => (
              <div key={index} className="beneficiary">
                <input
                  type="text"
                  placeholder="Name"
                  value={beneficiary.name}
                  onChange={(e) => handleBeneficiaryChange(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Relation"
                  value={beneficiary.relation}
                  onChange={(e) => handleBeneficiaryChange(index, 'relation', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Share (%)"
                  value={beneficiary.share}
                  onChange={(e) => handleBeneficiaryChange(index, 'share', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addBeneficiary}>
              Add Beneficiary
            </button>
    
            <h2>Specific Bequests</h2>
            {formData.specificBequests.map((bequest, index) => (
              <div key={index} className="bequest">
                <input
                  type="text"
                  placeholder="Item (e.g., Jewelry, Car)"
                  value={bequest.item}
                  onChange={(e) => handleBequestChange(index, 'item', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Recipient"
                  value={bequest.recipient}
                  onChange={(e) => handleBequestChange(index, 'recipient', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addBequest}>
              Add Bequest
            </button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };

export default Will