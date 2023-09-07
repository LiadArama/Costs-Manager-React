import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Add the styles

function DateRangeSelector({ onSelectDateRange }) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleGenerateReport = () => {
    onSelectDateRange(dateRange.startDate, dateRange.endDate);
  };

  return (
    <div>
      <h2>Select Date Range</h2>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
      />
      <button onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
}

export default DateRangeSelector;
