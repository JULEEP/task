import React, { useState } from "react";

const EmployeeTrackingTable = () => {
  const [activities, setActivities] = useState([
    // Sample data
    {
      empName: "John Doe",
      empId: "EMP001",
      startTime: "08:00",
      endTime: "09:00",
      status: "Working",
      duration: "1 hour",
      date: "2025-03-19",
      reason: "", // Reason for idle time request (empty for working)
      screenshots: [
        { timestamp: "2025-03-19 08:10", blob: new Blob(["image data 1"], { type: "image/jpeg" }) },
        { timestamp: "2025-03-19 08:20", blob: new Blob(["image data 2"], { type: "image/jpeg" }) },
        { timestamp: "2025-03-19 08:30", blob: new Blob(["image data 3"], { type: "image/jpeg" }) },
        // Add more screenshots as needed...
      ],
    },
    {
      empName: "Jane Smith",
      empId: "EMP002",
      startTime: "11:00",
      endTime: "12:00",
      status: "Idle",
      duration: "1 hour",
      date: "2025-03-19",
      reason: "System down",
      screenshots: [
        { timestamp: "2025-03-19 11:10", blob: new Blob(["image data 4"], { type: "image/jpeg" }) },
        { timestamp: "2025-03-19 11:20", blob: new Blob(["image data 5"], { type: "image/jpeg" }) },
        // Add more screenshots as needed...
      ],
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEmpName, setSelectedEmpName] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [notification, setNotification] = useState("");
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [selectedScreenshots, setSelectedScreenshots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const screenshotsPerPage = 8;

  const currentDate = new Date().toLocaleDateString();

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle Accept action (Idle time accepted)
  const handleAcceptIdleTime = (activity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activityItem) =>
        activityItem === activity
          ? {
              ...activityItem,
              status: "Working", // Update status to "Working" upon acceptance
              duration: "0 hours", // Reset idle duration to 0
              reason: "", // Clear reason once accepted
            }
          : activityItem
      )
    );
    setNotification(`Idle time accepted for ${activity.empName} (Emp ID: ${activity.empId}).`);
  };

  // Handle Reject action (Idle time rejected)
  const handleRejectIdleTime = (activity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activityItem) =>
        activityItem === activity
          ? { ...activityItem, status: "Not Working", reason: "" } // Update status to "Not Working" upon rejection
          : activityItem
      )
    );
    setNotification(`Idle time rejected for ${activity.empName} (Emp ID: ${activity.empId}).`);
  };

  // Filter activities based on the selected filters (Emp Name, Emp ID, Month, Year)
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    const matchesMonth = selectedMonth
      ? activityDate.getMonth() + 1 === parseInt(selectedMonth)
      : true;
    const matchesYear = selectedYear
      ? activityDate.getFullYear() === parseInt(selectedYear)
      : true;
    const matchesEmpName = selectedEmpName
      ? activity.empName.includes(selectedEmpName)
      : true;
    const matchesEmpId = selectedEmpId ? activity.empId.includes(selectedEmpId) : true;

    return matchesMonth && matchesYear && matchesEmpName && matchesEmpId;
  });

  // Calculate the total working and idle hours for each employee
  const getTotalHoursByEmployee = (empId) => {
    let totalWorkingHours = 0;
    let totalIdleHours = 0;

    const employeeActivities = filteredActivities.filter(
      (activity) => activity.empId === empId
    );

    employeeActivities.forEach((activity) => {
      if (activity.status === "Working") {
        totalWorkingHours += parseFloat(activity.duration.split(" ")[0]);
      } else if (activity.status === "Idle" || activity.status === "Pending") {
        totalIdleHours += parseFloat(activity.duration.split(" ")[0]);
      }
    });

    return { totalWorkingHours, totalIdleHours };
  };

  // Pagination logic for screenshots
  const indexOfLastScreenshot = currentPage * screenshotsPerPage;
  const indexOfFirstScreenshot = indexOfLastScreenshot - screenshotsPerPage;
  const currentScreenshots = selectedScreenshots.slice(indexOfFirstScreenshot, indexOfLastScreenshot);
  const totalPages = Math.ceil(selectedScreenshots.length / screenshotsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openScreenshotModal = (screenshots) => {
    setSelectedScreenshots(screenshots);
    setCurrentPage(1); // Reset to first page when modal is opened
    setShowScreenshotModal(true);
  };

  const closeScreenshotModal = () => {
    setShowScreenshotModal(false);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {/* Filters */}
      <div className="flex items-center justify-start mb-4">
        <label htmlFor="monthFilter" className="mr-2 font-semibold">
          Filter by Month:
        </label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div className="flex items-center justify-start mb-4">
        <label htmlFor="yearFilter" className="mr-2 font-semibold">
          Filter by Year:
        </label>
        <input
          type="number"
          id="yearFilter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Enter Year (e.g. 2025)"
        />
      </div>

      <div className="text-center text-2xl font-bold mb-4">Date: {currentDate}</div>

      {/* Notification for accept/reject */}
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded-lg mb-4 text-center">
          {notification}
        </div>
      )}

      {/* Table displaying activity data */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-2 px-4 text-left">Emp Name</th>
            <th className="py-2 px-4 text-left">Emp ID</th>
            <th className="py-2 px-4 text-left">Start Time</th>
            <th className="py-2 px-4 text-left">End Time</th>
            <th className="py-2 px-4 text-left">Activity Status</th>
            <th className="py-2 px-4 text-left">Duration</th>
            <th className="py-2 px-4 text-left">Total Working Hours</th>
            <th className="py-2 px-4 text-left">Total Idle Hours</th>
            <th className="py-2 px-4 text-left">Action</th>
            <th className="py-2 px-4 text-left">Reason</th>
            <th className="py-2 px-4 text-left">View Screenshots</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity, index) => {
            const { totalWorkingHours, totalIdleHours } = getTotalHoursByEmployee(activity.empId);
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="py-2 px-4">{activity.empName}</td>
                <td className="py-2 px-4">{activity.empId}</td>
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
                        ? "text-red-600 font-bold"
                        : "text-yellow-600 font-bold"
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
                <td className="py-2 px-4">{activity.duration}</td>
                <td className="py-2 px-4">
                  {totalWorkingHours.toFixed(2)} hours
                </td>
                <td className="py-2 px-4">
                  {totalIdleHours.toFixed(2)} hours
                </td>
                <td className="py-2 px-4">
                  {activity.status === "Idle" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptIdleTime(activity)}
                        className="bg-green-500 text-white py-1 px-4 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectIdleTime(activity)}
                        className="bg-red-500 text-white py-1 px-4 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4">
                  {activity.status === "Pending" ? activity.reason : "N/A"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openScreenshotModal(activity.screenshots)}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    View Screenshots
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Screenshot Modal */}
      {showScreenshotModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <div className="text-2xl font-semibold mb-4">Screenshots</div>
            <div className="grid grid-cols-4 gap-4">
              {currentScreenshots.map((screenshot, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(screenshot.blob)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-auto mb-2 rounded"
                  />
                  <p className="text-sm text-gray-500">{screenshot.timestamp}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-l"
              >
                Previous
              </button>
              <div className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-r"
              >
                Next
              </button>
            </div>

            <button
              onClick={closeScreenshotModal}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTrackingTable;
