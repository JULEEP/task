import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRegClock, FaUserClock, FaRegImages } from "react-icons/fa";
import html2canvas from "html2canvas"; // Import html2canvas
import { saveAs } from "file-saver"; // Import file-saver

const EmployeeTracking = () => {
  const [employeeName, setEmployeeName] = useState("Julee");
  const [workTime, setWorkTime] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [isWorking, setIsWorking] = useState(true);
  const [startTime, setStartTime] = useState("09:09 AM");

  const [screenshots, setScreenshots] = useState([]); // Store screenshots temporarily
  const [isViewingRecords, setIsViewingRecords] = useState(false); // Toggle to view records
  const [selectedScreenshot, setSelectedScreenshot] = useState(null); // Store the selected screenshot for full view

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkTime((prev) => (isWorking ? prev + 1 : prev));
      setIdleTime((prev) => (!isWorking ? prev + 1 : prev));
    }, 60000); // Increment time every minute

    return () => clearInterval(interval);
  }, [isWorking]);

  // Function to capture screenshot and save it temporarily
  const captureScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      // Convert canvas to a blob and save it temporarily with timestamp
      canvas.toBlob((blob) => {
        const timestamp = new Date().toLocaleString(); // Get timestamp
        const screenshotData = {
          blob,
          timestamp,
        };
        setScreenshots((prevScreenshots) => [...prevScreenshots, screenshotData]); // Add to the screenshots array
      });
    });
  };

  // Take screenshot every minute
  useEffect(() => {
    const screenshotInterval = setInterval(() => {
      captureScreenshot();
    }, 60000); // Capture screenshot every minute

    return () => clearInterval(screenshotInterval); // Cleanup on unmount
  }, []);

  const toggleWorkStatus = () => {
    setIsWorking(!isWorking);
  };

  const toggleViewRecords = () => {
    setIsViewingRecords(!isViewingRecords);
  };

  const handleThumbnailClick = (screenshot) => {
    setSelectedScreenshot(screenshot); // Set selected screenshot for full view
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3 min-w-[350px] text-center">
        <h2 className="text-2xl font-semibold text-blue-600 flex items-center justify-center gap-2">
          <FaUserClock /> Macbell Time Champ
        </h2>
        <div className="mt-6 p-4 bg-green-200 rounded-md flex items-center justify-center gap-2">
          {isWorking ? (
            <FaPlay className="text-green-700 text-xl" />
          ) : (
            <FaPause className="text-red-700 text-xl" />
          )}
          <p className="text-lg font-bold text-green-700">
            {isWorking ? `Working - ${workTime} min` : `Idle - ${idleTime} min`}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
            <FaRegClock className="text-gray-500" /> Welcome, {employeeName}
          </p>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <FaRegClock className="text-gray-500" /> Worked for: {workTime} min
          </p>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <FaRegClock className="text-gray-500" /> Idle for: {idleTime} min
          </p>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <FaRegClock className="text-gray-500" /> Started at: {startTime}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={toggleWorkStatus}
            className={`px-8 py-3 text-white font-bold rounded-full ${isWorking ? "bg-red-500" : "bg-green-500"} hover:opacity-80`}
          >
            {isWorking ? (
              <>
                <FaPause className="inline mr-2" />
                Pause
              </>
            ) : (
              <>
                <FaPlay className="inline mr-2" />
                Resume
              </>
            )}
          </button>
          {/* View All Records Button */}
          <button
            onClick={toggleViewRecords}
            className="mt-4 px-8 py-3 text-white font-bold rounded-full bg-blue-500 hover:opacity-80"
          >
            <FaRegImages className="inline mr-2" />
            View All Records
          </button>
        </div>
      </div>

      {/* Modal for viewing records */}
      {isViewingRecords && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h3 className="text-2xl font-semibold text-center mb-4">All Screenshots</h3>
            <div className="grid grid-cols-3 gap-4">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleThumbnailClick(screenshot)}
                >
                  <p className="text-sm text-gray-500 mb-2">{screenshot.timestamp}</p>
                  <img
                    src={URL.createObjectURL(screenshot.blob)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            {/* Fullscreen modal for selected screenshot */}
            {selectedScreenshot && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg w-3/4">
                  <h4 className="text-lg font-semibold text-center mb-4">Full Screenshot</h4>
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-4">{selectedScreenshot.timestamp}</p>
                    <img
                      src={URL.createObjectURL(selectedScreenshot.blob)}
                      alt="Full Screenshot"
                      className="w-full max-w-[800px] h-auto mb-4"
                    />
                    <button
                      onClick={() => setSelectedScreenshot(null)}
                      className="px-6 py-2 bg-red-500 text-white rounded-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={toggleViewRecords}
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

export default EmployeeTracking;
