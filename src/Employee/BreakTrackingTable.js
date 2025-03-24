import React, { useState, useEffect, useRef } from "react";

const BreakTrackingTable = () => {
  const [breaks, setBreaks] = useState([
    {
      date: "2025-03-19", // Date for filtering
      startTime: "10:00",
      endTime: "10:30",
      breakReason: "Coffee break",
    },
    {
      date: "2025-03-19",
      startTime: "15:00",
      endTime: "15:15",
      breakReason: "Quick walk",
    },
    {
      date: "2025-03-19",
      startTime: "12:30",
      endTime: "13:00",
      breakReason: "Lunch break",
    },
    {
      date: "2025-03-19",
      startTime: "16:00",
      endTime: "16:15",
      breakReason: "Tea break",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(""); // Date filter state
  const [newBreakPopup, setNewBreakPopup] = useState(false); // New break popup visibility
  const [newBreak, setNewBreak] = useState({
    startTime: "",
    endTime: "",
    breakReason: "",
    date: new Date().toLocaleDateString(),
  });

  const popupRef = useRef(null); // Ref for the popup

  // Filtering breaks by the selected date
  const filteredBreaks = selectedDate
    ? breaks.filter((breakItem) => breakItem.date === selectedDate)
    : breaks;

  // Add a new break record
  const addNewBreak = () => {
    if (!newBreak.startTime || !newBreak.endTime || !newBreak.breakReason) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const newBreakRecord = {
      date: newBreak.date,
      startTime: newBreak.startTime,
      endTime: newBreak.endTime,
      breakReason: newBreak.breakReason,
    };

    setBreaks((prevBreaks) => [...prevBreaks, newBreakRecord]);
    setNewBreakPopup(false);
    setNewBreak({
      startTime: "",
      endTime: "",
      breakReason: "",
      date: new Date().toLocaleDateString(),
    });
  };

  // Close popup when clicking outside of it
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setNewBreakPopup(false);
    }
  };

  // Add event listener when popup is visible
  useEffect(() => {
    if (newBreakPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newBreakPopup]);

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

      {/* Add New Break Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setNewBreakPopup(true)}
          className="bg-purple-600 text-white py-2 px-6 font-semibold rounded"
        >
          + Add New Break
        </button>
      </div>

      {/* New Break Popup */}
      {newBreakPopup && (
        <>
          {/* Background dimming */}
          <div className="fixed inset-0 bg-gray-300 opacity-50 z-10"></div>

          <div
            ref={popupRef}
            className="popup bg-white text-black p-6 rounded-lg shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 z-20"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Break</h3>
            <label className="block mb-2">Date:</label>
            <input
              type="date"
              value={newBreak.date}
              onChange={(e) => setNewBreak({ ...newBreak, date: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />

            <label className="block mb-2">Start Time:</label>
            <input
              type="time"
              value={newBreak.startTime}
              onChange={(e) => setNewBreak({ ...newBreak, startTime: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />

            <label className="block mb-2">End Time:</label>
            <input
              type="time"
              value={newBreak.endTime}
              onChange={(e) => setNewBreak({ ...newBreak, endTime: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />

            <label className="block mb-2">Break Reason:</label>
            <textarea
              value={newBreak.breakReason}
              onChange={(e) => setNewBreak({ ...newBreak, breakReason: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
              rows="4"
              placeholder="Describe your break reason here..."
            />

            <button
              onClick={addNewBreak}
              className="bg-purple-600 text-white py-2 px-6 rounded w-full"
            >
              Submit Break
            </button>
          </div>
        </>
      )}

      {/* Table displaying break records */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
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

export default BreakTrackingTable;
