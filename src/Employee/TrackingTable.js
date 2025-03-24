import React, { useEffect, useState } from "react";

const TrackingTable = () => {
  const [activities, setActivities] = useState([
    {
      startTime: "08:00",
      endTime: "09:00",
      status: "Working",
      duration: "1 hour",
      date: "2025-03-19", // Added date field
    },
    {
      startTime: "09:15",
      endTime: "10:30",
      status: "Not Working",
      duration: "1 hour 15 minutes",
      date: "2025-03-19",
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      status: "Idle",
      duration: "1 hour",
      date: "2025-03-19",
    },
    {
      startTime: "12:30",
      endTime: "13:15",
      status: "Working",
      duration: "2 minutes",
      date: "2025-03-19",
    },
  ]);

  const [workingHours, setWorkingHours] = useState(0);
  const [idleHours, setIdleHours] = useState(0);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedIdleActivity, setSelectedIdleActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  const currentDate = new Date().toLocaleDateString();

  // Function to convert time to AM/PM format (e.g., 08:00 AM)
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This ensures AM/PM format
    });
  };

  // Function to handle idle time completion request
  const handleIdleTimeRequest = (activity) => {
    setSelectedIdleActivity(activity);
    setIsRequestPending(true);
  };

  const submitIdleTimeRequest = () => {
    if (reason.trim() === "") {
      alert("Please provide a reason for completing the idle time.");
      return;
    }

    // Set status to "Pending" and retain idle hours until admin approval
    setIsRequestPending(false);

    // Update activity status to "Pending"
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity === selectedIdleActivity
          ? {
              ...activity,
              status: "Pending",
            }
          : activity
      )
    );
  };

  // Filtering activities by the selected date
  const filteredActivities = selectedDate
    ? activities.filter((activity) => activity.date === selectedDate)
    : activities;

  // Updating working and idle hours dynamically
  useEffect(() => {
    let totalWorkingHours = 0;
    let totalIdleHours = 0;
    filteredActivities.forEach((activity) => {
      if (activity.status === "Working") {
        totalWorkingHours += parseFloat(activity.duration.split(" ")[0]);
      } else if (activity.status === "Idle" || activity.status === "Pending") {
        totalIdleHours += parseFloat(activity.duration.split(" ")[0]);
      }
    });
    setWorkingHours(totalWorkingHours);
    setIdleHours(totalIdleHours);
  }, [filteredActivities]);

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

      {/* Displaying the current date at the top */}
      <div className="text-center text-2xl font-bold mb-4">
        Date: {currentDate}
      </div>

      {/* Show idle time request popup if pending */}
      {isRequestPending && (
        <>
          {/* Background dimming */}
          <div className="fixed inset-0 bg-gray-300 opacity-50 z-10"></div>

          <div className="popup bg-gray-800 text-white p-6 rounded-lg shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 z-20">
            <h3 className="text-xl font-semibold mb-4">Reason for Completing Idle Time</h3>
            <textarea
              className="border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none p-2 rounded w-full mb-4 text-black"
              placeholder="Enter reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
            />

            <button
              onClick={submitIdleTimeRequest}
              className="bg-purple-600 text-white py-2 px-4 mt-2 rounded w-full"
            >
              Submit Request
            </button>
          </div>
        </>
      )}

      {/* Table displaying activity data */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-2 px-4 text-left">Start Time</th>
            <th className="py-2 px-4 text-left">End Time</th>
            <th className="py-2 px-4 text-left">Activity Status</th>
            <th className="py-2 px-4 text-left">Duration</th>
            <th className="py-2 px-4 text-left">Working Hours</th>
            <th className="py-2 px-4 text-left">Idle Hours</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="py-2 px-4">{formatTime(activity.startTime)}</td>
              <td className="py-2 px-4">{formatTime(activity.endTime)}</td>
              <td className="py-2 px-4">
                <span
                  className={`${
                    activity.status === "Working"
                      ? "text-green-600 font-bold"
                      : activity.status === "Not Working"
                      ? "text-red-600 font-bold"
                      : activity.status === "Pending"
                      ? "text-red-600 font-bold" // Red color for Pending
                      : "text-yellow-600 font-bold"
                  }`}
                >
                  {activity.status}
                </span>
              </td>
              <td className="py-2 px-4">{activity.duration}</td>
              <td className="py-2 px-4">
                {activity.status === "Working"
                  ? parseFloat(activity.duration.split(" ")[0])
                  : 0}{" "}
                hours
              </td>
              <td className="py-2 px-4">
                {activity.status === "Idle" || activity.status === "Pending"
                  ? parseFloat(activity.duration.split(" ")[0])
                  : 0}{" "}
                hours
              </td>
              <td className="py-2 px-4">
                {activity.status === "Idle" && (
                  <button
                    onClick={() => handleIdleTimeRequest(activity)}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Complete Idle Time
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display working and idle hours in the table footer with color styling */}
      <div className="mt-4 text-center">
        <p
          className="text-xl font-bold"
          style={{ color: "green" }}
        >
          Working Hours: <span className="text-green-600">{workingHours.toFixed(2)} hours</span>
        </p>
        <p
          className="text-xl font-bold"
          style={{ color: "orange" }}
        >
          Idle Hours: <span className="text-yellow-600">{idleHours.toFixed(2)} hours</span>
        </p>
      </div>
    </div>
  );
};

export default TrackingTable;
