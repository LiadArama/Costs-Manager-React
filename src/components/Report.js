import React, {useState} from "react";
import idb from "../idb";
import DateForm from "./DateForm";
import '../componentsStyle/Report.css';
async function fetchDataFromIndexedDB(db) {
  try {
    return await idb.getAllCosts(db);
  } catch (error) {
    console.error("Error fetching data from IndexedDB:", error);
    return [];
  }
}

function Report() {
  const [reportData, setReportData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");


  const handleSelectedDate = async (date) => {
    setSelectedDate(date);
  }
  const handleGenerateReport = async () => {
    try {
      const db = await idb.openCostsDB("costsdb", 1);
      const costItems = await fetchDataFromIndexedDB(db);
      // Filter costItems based on startDate and endDate
      const filteredCostItems = costItems.filter((item) => {
        return item.timestamp.includes(selectedDate);
      });

      setReportData(filteredCostItems);

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
    <div className="container">
      <h2>Generate Report</h2>
      <DateForm onSelectedDate={handleSelectedDate} />
      <button onClick={handleGenerateReport}>Generate Report</button>
      <div>
        <br/><br/>
        <h3>Report</h3>
        <ul>
          {reportData.map((costItem, index) => (
            <li key={index}>
              Date: {new Date(costItem.timestamp).toLocaleDateString()}, Sum:
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
