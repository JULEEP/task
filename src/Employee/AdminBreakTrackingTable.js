import React, { useState, useEffect, useRef } from "react";

const AdminBreakTrackingTable = () => {
  const [breaks, setBreaks] = useState([
    {
      empId: "E001",
      empName: "John Doe",
      date: "2025-03-19", // Date for filtering
      startTime: "10:00",
      endTime: "10:30",
      breakReason: "Coffee break",
    },
    {
      empId: "E002",
      empName: "Jane Smith",
      date: "2025-03-19",
      startTime: "15:00",
      endTime: "15:15",
      breakReason: "Quick walk",
    },
    {
      empId: "E003",
      empName: "Alice Brown",
      date: "2025-03-19",
      startTime: "12:30",
      endTime: "13:00",
      breakReason: "Lunch break",
    },
    {
      empId: "E004",
      empName: "Bob Johnson",
      date: "2025-03-19",
      startTime: "16:00",
      endTime: "16:15",
      breakReason: "Tea break",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(""); // Date filter state

  // Filtering breaks by the selected date
  const filteredBreaks = selectedDate
    ? breaks.filter((breakItem) => breakItem.date === selectedDate)
    : breaks;

  return (
    <div className="container mx-auto my-8 p-4">
      {/* Date filter at the top-left */}
      <div className="flex items-center justify-start mb-4">
        <label htmlFor="dateFilter" className="mr-2 font-semibold">
          Filter by Date:
        </label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
      </div>

      {/* Table displaying employee break data */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-2 px-4 text-left">Employee ID</th>
            <th className="py-2 px-4 text-left">Employee Name</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Start Time</th>
            <th className="py-2 px-4 text-left">End Time</th>
            <th className="py-2 px-4 text-left">Break Reason</th>
          </tr>
        </thead>
        <tbody>
          {filteredBreaks.map((breakItem, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
            >
              <td className="py-2 px-4">{breakItem.empId}</td>
              <td className="py-2 px-4">{breakItem.empName}</td>
              <td className="py-2 px-4">{breakItem.date}</td>
              <td className="py-2 px-4">{breakItem.startTime}</td>
              <td className="py-2 px-4">{breakItem.endTime}</td>
              <td className="py-2 px-4">{breakItem.breakReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBreakTrackingTable;
