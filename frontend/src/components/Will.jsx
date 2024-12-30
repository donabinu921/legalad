import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`);

const sendToGemini = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are a will drafting agent. The user will provide the necessary details for drafting a will. Draft the will based on the rules in India. It is understood that this is a sample will and a lawyer should be consulted, so don't give advise and provide only the draft of the will.",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    });

    const chat = model.startChat({
      history: [],
      generationConfig: { temperature: 0.9 },
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

const Will = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [textFile, setTextFile] = useState(null);
  const [formData, setFormData] = useState({
    testatorName: "",
    testatorAddress: "",
    executorName: "",
    executorAddress: "",
    beneficiaries: [{ name: "", relation: "", share: "" }],
    specificBequests: [{ item: "", recipient: "" }],
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
      beneficiaries: [
        ...formData.beneficiaries,
        { name: "", relation: "", share: "" },
      ],
    });
  };

  const deleteBeneficiary = (index) => {
    const updatedBeneficiaries = formData.beneficiaries.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, beneficiaries: updatedBeneficiaries });
  };

  const addBequest = () => {
    setFormData({
      ...formData,
      specificBequests: [
        ...formData.specificBequests,
        { item: "", recipient: "" },
      ],
    });
  };

  const deleteBequest = (index) => {
    const updatedBequests = formData.specificBequests.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, specificBequests: updatedBequests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sendToGemini(
       `
       Create the will using the following details
       
       1. Testator's Details
- *Full Name*: Ramesh Kumar Gupta  
- *Address*: 123, Green Valley Apartments, Sector-21, New Delhi, 110075  
- *Date of Birth*: 15th August 1970  
- *Aadhaar Number*: 1234 5678 9101  
- *Mental Fitness Declaration*: "I, Ramesh Kumar Gupta, declare that I am of sound mind and fully competent to make this will."

---

### *2. Declaration of Intent*
"I declare that this document is my last will and testament, and it revokes all previous wills or codicils made by me."

---

### *3. Marital Status*
- *Marital Status*: Married  
- *Spouse's Name*: Sunita Devi Gupta  

---

### *4. Details of Immediate Family*
- *Spouse*: Sunita Devi Gupta  
- *Children*:  
  - Name: Rahul Kumar Gupta, DOB: 12th January 1995  
  - Name: Priya Kumari Gupta, DOB: 5th July 1998  
- *Parents*:  
  - Father: Late Mohan Lal Gupta  
  - Mother: Shanti Devi Gupta (Deceased)  
- *Siblings*:  
  - Brother: Rajesh Kumar Gupta  
  - Sister: Anita Kumari  

---

### *5. Executor Details*
- *Executor's Name*: Manoj Sharma  
- *Executor's Address*: 78, Blue Tower Society, Gurugram, Haryana, 122001  
- *Relationship*: Family Friend  
- *Alternate Executor*: Vikram Malhotra, Address: 45, Blossom Apartments, Noida, Uttar Pradesh  

---

### *6. Beneficiaries*
1. *Name*: Sunita Devi Gupta (Spouse)  
   *Share*: 50% of all movable and immovable assets.  

2. *Name*: Rahul Kumar Gupta (Son)  
   *Share*: 25% of the estate.  

3. *Name*: Priya Kumari Gupta (Daughter)  
   *Share*: 25% of the estate.  

4. *Specific Bequest*:  
   - Item: Gold Necklace  
   - Recipient: Priya Kumari Gupta  

---

    7. Details of Assets*
    Immovable Assets:
1. Property: 3 BHK Apartment  
   Address: 123, Green Valley Apartments, Sector-21, New Delhi  
   Ownership: Sole Owner  
   Allocation: To Sunita Devi Gupta  

     Movable Assets:
1. Bank Account:  
   - Bank: State Bank of India  
   - Account Number: 0123456789  
   - Branch: Connaught Place, New Delhi  
   - Allocation: Shared equally among Rahul and Priya.  

2. Vehicle:  
   - Car: Hyundai Creta, Registration Number DL 10 AB 1234  
   - Allocation: Rahul Kumar Gupta  

3. Investments:  
   - Mutual Funds: HDFC Balanced Advantage Fund  
   - Allocation: Sunita Devi Gupta  
    

   8. Specific Bequests
1. Gold Necklace: Allocated to Priya Kumari Gupta.  
2. Wristwatch: Allocated to Rahul Kumar Gupta.  



    9. Debts and Liabilities
1. Home Loan:  
   - Bank: ICICI Bank  
   - Outstanding Amount: ₹10,00,000  
   - To be cleared using funds from the estate.  

2. Credit Card:  
   - Card: HDFC Regalia Credit Card  
   - Outstanding Amount: ₹50,000  
   - To be settled before distribution of assets.  


    10. Guardianship (if applicable)*
Not Applicable (all children are adults).


*11. Witness Details*
1. *Name*: Deepak Mehta  
   *Address*: 67, Sunrise Enclave, New Delhi  
   *Occupation*: Retired Government Officer  

2. *Name*: Alok Verma  
   *Address*: 89, Lakeview Apartments, Gurugram, Haryana  
   *Occupation*: Chartered Accountant  



    12. Other Instructions*
- Funeral Preference: Simple ceremony at the local crematorium.  
- Charitable Donation: ₹50,000 to be donated to an orphanage in Delhi.`
      );
      setResponse(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };



  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-center text-blue-600 text-3xl font-bold my-12">
        Draft Your Will
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="w-full flex flex-col">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            Testator Details (Who is making this will?)
          </h2>
          <input
            type="text"
            name="testatorName"
            placeholder="Full Name"
            value={formData.testatorName}
            onChange={handleChange}
            className="border p-2 rounded mb-4"
          />
          <input
            type="text"
            name="testatorAddress"
            placeholder="Address"
            value={formData.testatorAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4"
          />

          <h2 className="text-blue-600 text-xl font-medium mb-4">
            Executor Details
          </h2>
          <input
            type="text"
            name="executorName"
            placeholder="Executor's Full Name"
            value={formData.executorName}
            onChange={handleChange}
            className="border p-2 rounded mb-4"
          />
          <input
            type="text"
            name="executorAddress"
            placeholder="Executor's Address"
            value={formData.executorAddress}
            onChange={handleChange}
            className="border p-2 rounded mb-4"
          />

          <h2 className="text-blue-600 text-xl font-medium mb-4">
            Beneficiaries
          </h2>
          {formData.beneficiaries.map((beneficiary, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={beneficiary.name}
                onChange={(e) =>
                  handleBeneficiaryChange(index, "name", e.target.value)
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Relation"
                value={beneficiary.relation}
                onChange={(e) =>
                  handleBeneficiaryChange(index, "relation", e.target.value)
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Share (%)"
                value={beneficiary.share}
                onChange={(e) =>
                  handleBeneficiaryChange(index, "share", e.target.value)
                }
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

          <h2 className="text-blue-600 text-xl font-medium mb-4">
            Specific Bequests
          </h2>
          {formData.specificBequests.map((bequest, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Item (e.g., Jewelry, Car)"
                value={bequest.item}
                onChange={(e) =>
                  handleBequestChange(index, "item", e.target.value)
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Recipient"
                value={bequest.recipient}
                onChange={(e) =>
                  handleBequestChange(index, "recipient", e.target.value)
                }
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
