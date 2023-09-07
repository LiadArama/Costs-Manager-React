import React, { useState } from "react";
import idb from "../idb";
import DateRangeSelector from "./DateRangeSelector";

async function fetchDataFromIndexedDB(db) {
  try {
    const costs = await idb.getAllCosts(db);
    return costs;
  } catch (error) {
    console.error("Error fetching data from IndexedDB:", error);
    return [];
  }
}

function Report() {
  const [reportData, setReportData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleGenerateReport = async (startDate, endDate) => {
    try {
      const db = await idb.openCostsDB("costsdb", 1);
      const costItems = await fetchDataFromIndexedDB(db);

      // Filter costItems based on startDate and endDate
      const filteredCostItems = costItems.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate <= endDate;
      });

      setReportData(filteredCostItems);
      setSelectedDateRange({ startDate, endDate });
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const handleDeleteCost = async (id) => {
    try {
      const db = await idb.openCostsDB("costsdb", 1);
      await idb.deleteCost(db, id);
      const updatedData = await fetchDataFromIndexedDB(db);
      setReportData(updatedData);
    } catch (error) {
      console.error("Error deleting cost:", error);
    }
  };

  return (
    <div>
      <DateRangeSelector onSelectDateRange={handleGenerateReport} />
      <h2>Generate Report</h2>
      <button onClick={handleGenerateReport}>Generate Report</button>
      <div>
        <h3>Cost Items</h3>
        <ul>
          {reportData.map((costItem, index) => (
            <li key={index}>
              Date: {new Date(costItem.timestamp).toLocaleString()}, Sum:
              {costItem.sum}, Category: {costItem.category}, Description:
              {costItem.description}
              <button onClick={() => handleDeleteCost(costItem.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Report;
