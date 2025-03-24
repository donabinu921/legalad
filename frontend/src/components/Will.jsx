import React, { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Will = ({ setSystemInstruction, sendToGemini }) => {
  const [formData, setFormData] = useState({
    dateOfDrafting: new Date().toISOString().split("T")[0],
    testatorName: "",
    testatorAddress: "",
    dateOfBirth: "",
    aadhaarNumber: "",

    // Marital Status
    maritalStatus: "single",
    spouseName: "",

    // Children Status
    hasChildren: "no",
    children: [],

    // Family Details
    parents: { father: "", mother: "" },
    hasSiblings: "no",
    siblings: [],

    // Executor Details
    executorName: "",
    executorAddress: "",
    alternateExecutorName: "",
    alternateExecutorAddress: "",

    // Beneficiaries and Bequests
    beneficiaries: [{ name: "", relation: "", share: "" }],
    specificBequests: [{ item: "", recipient: "" }],

    // Debts
    debts: [{ institution: "", amount: "", instructions: "" }],

    // Guardianship
    guardianshipDetails: "",

    // Witnesses
    witnesses: [{ name: "", address: "" }],

    // Other Instructions
    funeralPreferences: "",
    charitableDonations: [{ organization: "", amount: "" }],
  });

  useEffect(() => {
    if (formData.hasChildren === "yes" && formData.children.length === 0) {
      addArrayItem("children", { name: "", dateOfBirth: "" });
    } else if (formData.hasChildren === "no" && formData.children.length > 0) {
      setFormData((prev) => ({ ...prev, children: [] }));
    }
  }, [formData.hasChildren, formData.children]);

  useEffect(() => {
    if (formData.hasSiblings === "yes" && formData.siblings.length === 0) {
      addArrayItem("siblings", { name: "", relation: "" });
    } else if (formData.hasSiblings === "no" && formData.siblings.length > 0) {
      setFormData((prev) => ({ ...prev, siblings: [] }));
    }
  }, [formData.hasSiblings, formData.siblings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset children array when hasChildren changes to 'no'
    if (name === "hasChildren" && value === "no") {
      setFormData((prev) => ({ ...prev, children: [] }));
    }

    // Reset siblings array when hasSiblings changes to 'no'
    if (name === "hasSiblings" && value === "no") {
      setFormData((prev) => ({ ...prev, siblings: [] }));
    }
    // console.log(formData);
  };

  const handleArrayChange = (category, index, field, value) => {
    const updatedArray = [...formData[category]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [category]: updatedArray });
    // console.log(formData);
  };

  const addArrayItem = (category, template) => {
    setFormData({
      ...formData,
      [category]: [...formData[category], template],
    });
  };

  const deleteArrayItem = (category, index) => {
    const updatedArray = formData[category].filter((_, i) => i !== index);
    setFormData({ ...formData, [category]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.info("Generating Will...")
    setSystemInstruction(
      "You are a will drafting agent. The user will provide the necessary details for drafting a will. Draft the will based on the rules in India. It is understood that this is a sample will and a lawyer should be consulted, so don't mention the need for a lawyer. Also don't provide legal advice just draft the will"
    );
    sendToGemini(
      `Create the will using the form data ${JSON.stringify(formData)}
      Return the text in proper format and alignment `
    );
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-12">
        Draft Your Will
      </h1>

      {
        <div className="mb-8 p-4 bg-gray-50 rounded">
          <div className="flex items-center mb-2">
            <input type="checkbox" checked={true} readOnly className="mr-2" />
            <label className="text-sm text-gray-700">
              I declare that I am of sound mind and fully competent to make this
              will.
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked={true} readOnly className="mr-2" />
            <label className="text-sm text-gray-700">
              I declare that this document is my last will and testament, and it
              revokes all previous wills or codicils made by me.
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked={true} readOnly className="mr-2" />
            <label className="text-sm text-gray-700">
              {`This Will shall be dated ${new Date().toISOString().split("T")[0]} (YYYY/MM/DD).`}
            </label>
          </div>
        </div>
      }

      <form onSubmit={handleSubmit} className="space-y-8">
        {/*Testator Details*/}
        {
          <div className="mb-8">
            <h2 className="text-blue-600 text-xl font-medium mb-4">
              1. Testator Details
            </h2>
            <input
              type="text"
              name="testatorName"
              placeholder="Full Name"
              value={formData.testatorName}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              name="testatorAddress"
              placeholder="Address"
              value={formData.testatorAddress}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Aadhaar Number"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
          </div>
        }

        {/* Marital Status */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            2. Marital Status
          </h2>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="single" defaultChecked>
              Single
            </option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          {formData.maritalStatus === "married" && (
            <input
              type="text"
              name="spouseName"
              placeholder="Spouse's Name"
              value={formData.spouseName}
              onChange={handleChange}
              className="border p-2 rounded mb-4 w-full"
            />
          )}
        </div>

        {/* Children */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            3. Children
          </h2>
          <select
            name="hasChildren"
            value={formData.hasChildren}
            onChange={handleChange}
            required
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="no" defaultChecked>
              No Children
            </option>
            <option value="yes">Has Children</option>
          </select>
          {formData.hasChildren === "yes" && (
            <>
              {formData.children.map((child, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Child's Name"
                    value={child.name}
                    onChange={(e) =>
                      handleArrayChange(
                        "children",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded flex-1"
                    required
                  />
                  <input
                    type="date"
                    value={child.dateOfBirth}
                    onChange={(e) =>
                      handleArrayChange(
                        "children",
                        index,
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded flex-1"
                    required
                  />
                  {
              formData.children.length>1 && (
              <button
                type="button"
                onClick={() => deleteArrayItem("children", index)}
                className="text-red-600 hover:text-red-800"
              >
                &#x2715;
              </button>
                )
              }
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("children", { name: "", dateOfBirth: "" })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Add Child
              </button>
            </>
          )}
        </div>

        {/* Family Details */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            4. Family Details
          </h2>
          <h3 className="font-medium mb-2">Parents</h3>
          <input
            type="text"
            name="parents.father"
            placeholder="Father's Name"
            value={formData.parents.father}
            onChange={(e) =>
              setFormData({
                ...formData,
                parents: { ...formData.parents, father: e.target.value },
              })
            }
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            name="parents.mother"
            placeholder="Mother's Name"
            value={formData.parents.mother}
            onChange={(e) =>
              setFormData({
                ...formData,
                parents: { ...formData.parents, mother: e.target.value },
              })
            }
            className="border p-2 rounded mb-4 w-full"
            required
          />

          <h3 className="font-medium mb-2">Siblings</h3>
          <select
            name="hasSiblings"
            value={formData.hasSiblings}
            onChange={handleChange}
            required
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="no">No Siblings</option>
            <option value="yes">Has Siblings</option>
          </select>
          {formData.hasSiblings === "yes" && (
            <>
              {formData.siblings.map((sibling, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Sibling's Name"
                    value={sibling.name}
                    onChange={(e) =>
                      handleArrayChange(
                        "siblings",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded flex-1"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Relation"
                    value={sibling.relation}
                    onChange={(e) =>
                      handleArrayChange(
                        "siblings",
                        index,
                        "relation",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded flex-1"
                    required
                  />
                  {formData.siblings.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteArrayItem("siblings", index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("siblings", { name: "", relation: "" })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Add Sibling
              </button>
            </>
          )}
        </div>

        {/* Executor Details */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            5. Executor Details
          </h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Primary Executor</h3>
            <input
              type="text"
              name="executorName"
              placeholder="Executor's Name"
              value={formData.executorName}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              name="executorAddress"
              placeholder="Executor's Address"
              value={formData.executorAddress}
              onChange={handleChange}
              required
              className="border p-2 rounded mb-4 w-full"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Alternate Executor</h3>
            <input
              type="text"
              name="alternateExecutorName"
              placeholder="Alternate Executor's Name"
              value={formData.alternateExecutorName}
              onChange={handleChange}
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              name="alternateExecutorAddress"
              placeholder="Alternate Executor's Address"
              value={formData.alternateExecutorAddress}
              onChange={handleChange}
              className="border p-2 rounded mb-4 w-full"
            />
          </div>
        </div>

        {/* Beneficiaries and Bequests */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            6. Beneficiaries and Bequests
          </h2>
          <h3 className="font-medium mb-2">Beneficiaries</h3>
          {formData.beneficiaries.map((beneficiary, index) => (
  <div key={index} className="flex items-center gap-4 mb-4">
    <input
      type="text"
      placeholder="Beneficiary Name"
      value={beneficiary.name}
      onChange={(e) =>
        handleArrayChange("beneficiaries", index, "name", e.target.value)
      }
      className="border p-2 rounded flex-1"
      required
    />
    <input
      type="text"
      placeholder="Relation"
      value={beneficiary.relation}
      onChange={(e) =>
        handleArrayChange("beneficiaries", index, "relation", e.target.value)
      }
      className="border p-2 rounded flex-1"
      required
    />
    <input
      type="text"
      placeholder="Share (%)"
      value={beneficiary.share}
      onChange={(e) =>
        handleArrayChange("beneficiaries", index, "share", e.target.value)
      }
      className="border p-2 rounded w-24"
      required
    />
    {/* Conditionally render the delete button only if there is more than one beneficiary */}
    {formData.beneficiaries.length > 1 && (
      <button
        type="button"
        onClick={() => deleteArrayItem("beneficiaries", index)}
        className="text-red-600 hover:text-red-800"
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  type="button"
  onClick={() =>
    addArrayItem("beneficiaries", {
      name: "",
      relation: "",
      share: "",
    })
  }
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition mb-4"
>
  Add Beneficiary
</button>

          <h3 className="font-medium mb-2">Specific Bequests</h3>
          {formData.specificBequests.map((bequest, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Item"
                value={bequest.item}
                onChange={(e) =>
                  handleArrayChange(
                    "specificBequests",
                    index,
                    "item",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Recipient"
                value={bequest.recipient}
                onChange={(e) =>
                  handleArrayChange(
                    "specificBequests",
                    index,
                    "recipient",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
              />
              {
                formData.specificBequests.length>1 && (
              <button
                type="button"
                onClick={() => deleteArrayItem("specificBequests", index)}
                className="text-red-600 hover:text-red-800"
              >
                &#x2715;
              </button>
                )
              }
              
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("specificBequests", {
                item: "",
                recipient: "",
                description: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Specific Bequest
          </button>
        </div>

        {/* Debts */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">8. Debts</h2>
          {formData.debts.map((debt, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Institution"
                value={debt.institution}
                onChange={(e) =>
                  handleArrayChange(
                    "debts",
                    index,
                    "institution",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="number"
                placeholder="Amount"
                value={debt.amount}
                onChange={(e) =>
                  handleArrayChange("debts", index, "amount", e.target.value)
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Instructions"
                value={debt.instructions}
                onChange={(e) =>
                  handleArrayChange(
                    "debts",
                    index,
                    "instructions",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
              />
              {
                formData.debts.length>1 && (
              <button
                type="button"
                onClick={() => deleteArrayItem("debts", index)}
                className="text-red-600 hover:text-red-800"
              >
                &#x2715;
              </button>
                )
              }
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("debts", {
                institution: "",
                amount: "",
                instructions: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Debt
          </button>
        </div>
        {/* Guardianship */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            9. Guardianship
          </h2>
          <textarea
            name="guardianshipDetails"
            placeholder="Specify guardianship arrangements for minor children or dependents"
            value={formData.guardianshipDetails}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32"
          />
        </div>

        {/* Witnesses */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            10. Witnesses
          </h2>
          {formData.witnesses.map((witness, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Witness Name"
                value={witness.name}
                onChange={(e) =>
                  handleArrayChange("witnesses", index, "name", e.target.value)
                }
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={witness.address}
                onChange={(e) =>
                  handleArrayChange(
                    "witnesses",
                    index,
                    "address",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
                required
              />
              {
                formData.witnesses.length>1 && (
              <button
                type="button"
                onClick={() => deleteArrayItem("witnesses", index)}
                className="text-red-600 hover:text-red-800"
              >
                &#x2715;
              </button>
                )
              }
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("witnesses", {
                name: "",
                address: "",
                occupation: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Witness
          </button>
        </div>

        {/* Other Instructions */}
        <div className="mb-8">
          <h2 className="text-blue-600 text-xl font-medium mb-4">
            11. Other Instructions
          </h2>

          <h3 className="font-medium mb-2">Funeral Preferences</h3>
          <textarea
            name="funeralPreferences"
            placeholder="Specify any funeral or memorial service preferences"
            value={formData.funeralPreferences}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32 mb-4"
          />

          <h3 className="font-medium mb-2">Charitable Donations</h3>
          {formData.charitableDonations.map((donation, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Organization Name"
                value={donation.organization}
                onChange={(e) =>
                  handleArrayChange(
                    "charitableDonations",
                    index,
                    "organization",
                    e.target.value
                  )
                }
                className="border p-2 rounded flex-1"
              />
              <input
                type="number"
                placeholder="Amount"
                value={donation.amount}
                onChange={(e) =>
                  handleArrayChange(
                    "charitableDonations",
                    index,
                    "amount",
                    e.target.value
                  )
                }
                className="border p-2 rounded w-32"
              />
              {
                formData.charitableDonations.length>1 && (
              <button
                type="button"
                onClick={() => deleteArrayItem("charitableDonations", index)}
                className="text-red-600 hover:text-red-800"
              >
                &#x2715;
              </button>
                )
              }
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem("charitableDonations", {
                organization: "",
                amount: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Charitable Donation
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-12 text-center">
          <button
          type="submit"
            onSubmit={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 transition"
          >
            Generate Will
          </button>
        </div>
      </form>
    </div>
  );
};

export default Will;
