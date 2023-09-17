import React, {useState} from 'react';
import {idb} from '../idb';
import DateForm from './date-form';
import '../componentsStyle/report.css';

async function fetchDataFromIndexedDB(dbObject) {
  try {
    return await dbObject.getAllCosts();
  } catch (error) {
    console.error('Error fetching data from IndexedDB:', error);
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
      const dbObject = await idb.openCostsDB('costsdb', 1);
      const costItems = await fetchDataFromIndexedDB(dbObject);
      const filteredCostItems = costItems.filter((item) => {
        return item.timestamp.includes(selectedDate);
      });
      filteredCostItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setReportData(filteredCostItems);

    } catch (error) {
      console.error('Error generating report:', error);
    }
  };


  return (
    <div className='container'>
      <h2>Generate Report</h2>
      <DateForm onSelectedDate={handleSelectedDate} />
      <button onClick={handleGenerateReport}>Generate Report</button>
      <br/><br/>
      <h3>Report</h3>
      <div>
        <ul>
          {reportData.map((costItem, index) => (
            <li key={index}>
              <b>Date:</b> {new Date(costItem.timestamp).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}<br/>
              <b>Amount:</b> {Number.parseFloat(costItem.sum).toLocaleString()}<br/>
              <b>Category:</b> {costItem.category}<br/>
              <b>Description:</b> {costItem.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Report;
