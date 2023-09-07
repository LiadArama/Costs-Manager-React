import React, { useState } from "react";
import idb from "../idb";

function CostForm() {
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("FOOD");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = await idb.openCostsDB("costsdb", 1);
      const result = await idb.addCost(db, { sum, category, description });
      console.log("Adding cost succeeded:", result);
      // Clear the form
      setSum("");
      setCategory("FOOD");
      setDescription("");
    } catch (error) {
      console.error("Error adding cost:", error);
    }
  };

  return (
    <div>
      <h2>Add New Cost</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Sum:
            <input
              type="number"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="FOOD">Food</option>
              <option value="HEALTH">Health</option>
              <option value="EDUCATION">Education</option>
              <option value="TRAVEL">Travel</option>
              <option value="HOUSING">Housing</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Add Cost</button>
        </div>
      </form>
    </div>
  );
}

export default CostForm;
