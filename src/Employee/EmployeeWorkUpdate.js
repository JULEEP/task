import React, { useState, useEffect, useRef } from "react";

const EmployeeWorkUpdate = () => {
  const [activities, setActivities] = useState([
    {
      date: "2025-03-19", // Date for filtering
      loginTime: "08:00",
      logoutTime: "09:00",
      taskDescription: "Checked emails and attended meetings",
      empName: "John Doe",
      empId: "E123",
    },
    {
      date: "2025-03-19",
      loginTime: "09:15",
      logoutTime: "10:30",
      taskDescription: "Break and personal time",
      empName: "Jane Smith",
      empId: "E124",
    },
    {
      date: "2025-03-19",
      loginTime: "11:00",
      logoutTime: "12:00",
      taskDescription: "Idle time",
      empName: "Alice Johnson",
      empId: "E125",
    },
    {
      date: "2025-03-19",
      loginTime: "12:30",
      logoutTime: "13:15",
      taskDescription: "Coding and bug fixes",
      empName: "Bob Lee",
      empId: "E126",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(""); // Date filter state
  const [selectedEmpName, setSelectedEmpName] = useState(""); // Employee name filter state
  const [newTaskPopup, setNewTaskPopup] = useState(false); // New task popup visibility
  const [newTask, setNewTask] = useState({
    loginTime: "",
    logoutTime: "",
    taskDescription: "",
    date: new Date().toLocaleDateString(),
    empName: "",
    empId: "",
  });

  const popupRef = useRef(null); // Ref for the popup

  // Filtering activities by the selected date and employee name
  const filteredActivities = activities.filter((activity) => {
    const matchesDate = selectedDate ? activity.date === selectedDate : true;
    const matchesEmpName =
      selectedEmpName ? activity.empName.toLowerCase().includes(selectedEmpName.toLowerCase()) : true;
    return matchesDate && matchesEmpName;
  });

  // Add a new task to the activities array
  const addNewTask = () => {
    if (!newTask.loginTime || !newTask.logoutTime || !newTask.taskDescription || !newTask.empName || !newTask.empId) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const newActivity = {
      date: newTask.date,
      loginTime: newTask.loginTime,
      logoutTime: newTask.logoutTime,
      taskDescription: newTask.taskDescription,
      empName: newTask.empName,
      empId: newTask.empId,
    };

    setActivities((prevActivities) => [...prevActivities, newActivity]);
    setNewTaskPopup(false);
    setNewTask({
      loginTime: "",
      logoutTime: "",
      taskDescription: "",
      date: new Date().toLocaleDateString(),
      empName: "",
      empId: "",
    });
  };

  // Close popup when clicking outside of it
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setNewTaskPopup(false);
    }
  };

  // Add event listener when popup is visible
  useEffect(() => {
    if (newTaskPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newTaskPopup]);

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

      {/* Employee name filter */}
      <div className="flex items-center justify-start mb-4">
        <label htmlFor="empNameFilter" className="mr-2 font-semibold">
          Filter by Employee Name:
        </label>
        <input
          type="text"
          id="empNameFilter"
          value={selectedEmpName}
          onChange={(e) => setSelectedEmpName(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Search by employee name"
        />
      </div>

      {/* Add New Task Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setNewTaskPopup(true)}
          className="bg-purple-600 text-white py-2 px-6 font-semibold rounded"
        >
          + Add New Task
        </button>
      </div>

     {/* New Task Popup */}
{newTaskPopup && (
    <>
      {/* Background dimming */}
      <div className="fixed inset-0 bg-gray-300 opacity-50 z-10"></div>
  
      <div
        ref={popupRef}
        className="popup bg-white text-black p-6 rounded-lg shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 z-20"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Date Field */}
          <div className="flex flex-col">
            <label className="block mb-2">Date:</label>
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />
          </div>
  
          {/* Login Time Field */}
          <div className="flex flex-col">
            <label className="block mb-2">Login Time:</label>
            <input
              type="time"
              value={newTask.loginTime}
              onChange={(e) => setNewTask({ ...newTask, loginTime: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />
          </div>
  
          {/* Logout Time Field */}
          <div className="flex flex-col">
            <label className="block mb-2">Logout Time:</label>
            <input
              type="time"
              value={newTask.logoutTime}
              onChange={(e) => setNewTask({ ...newTask, logoutTime: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />
          </div>
  
          {/* Emp Name Field */}
          <div className="flex flex-col">
            <label className="block mb-2">Emp Name:</label>
            <input
              type="text"
              value={newTask.empName}
              onChange={(e) => setNewTask({ ...newTask, empName: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />
          </div>
  
          {/* Emp ID Field */}
          <div className="flex flex-col">
            <label className="block mb-2">Emp ID:</label>
            <input
              type="text"
              value={newTask.empId}
              onChange={(e) => setNewTask({ ...newTask, empId: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
            />
          </div>
  
          {/* Task Description Field */}
          <div className="flex flex-col col-span-3">
            <label className="block mb-2">Tasks Performed:</label>
            <textarea
              value={newTask.taskDescription}
              onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
              className="border border-purple-500 p-2 rounded mb-4 w-full"
              rows="3"
              placeholder="Describe your tasks here..."
            />
          </div>
        </div>
  
        <button
          onClick={addNewTask}
          className="bg-purple-600 text-white py-2 px-6 rounded w-full"
        >
          Submit Task
        </button>
      </div>
    </>
  )}
  
      {/* Table displaying activity data */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-2 px-4 text-left">S. No.</th>
            <th className="py-2 px-4 text-left">Emp Name</th>
            <th className="py-2 px-4 text-left">Emp ID</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Login Time</th>
            <th className="py-2 px-4 text-left">Logout Time</th>
            <th className="py-2 px-4 text-left">Tasks Performed</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{activity.empName}</td>
              <td className="py-2 px-4">{activity.empId}</td>
              <td className="py-2 px-4">{activity.date}</td>
              <td className="py-2 px-4">{activity.loginTime}</td>
              <td className="py-2 px-4">{activity.logoutTime}</td>
              <td className="py-2 px-4">{activity.taskDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeWorkUpdate;
