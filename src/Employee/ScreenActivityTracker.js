import React, { useEffect, useState } from 'react';

const ScreenActivityTracker = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [screenshotCount, setScreenshotCount] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [screenStream, setScreenStream] = useState(null);

  let activityTimeout;

  // Function to start screen recording
  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
      });
      setScreenStream(stream);

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        // You can store or upload the video data here.
        // For example: videoChunks.push(e.data);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      trackActivity();
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  // Function to stop screen recording
  const stopScreenRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      screenStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Function to take a screenshot
  const takeScreenshot = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(document.body, 0, 0);
    const screenshot = canvas.toDataURL();
    console.log('Screenshot taken:', screenshot);
    setScreenshotCount(screenshotCount + 1);
  };

  // Activity tracking function
  const trackActivity = () => {
    // Listen for mouse and keyboard activity to set status as "Working"
    const resetActivity = () => {
      clearTimeout(activityTimeout);
      setStatus('Working');
      activityTimeout = setTimeout(() => {
        setStatus('Idle');
      }, 5 * 60 * 1000); // 5 minutes of inactivity
    };

    // Detect mouse movement or key press
    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keydown', resetActivity);

    // Initially set status to "Working"
    resetActivity();
  };

  // Taking a screenshot every 5 minutes
  useEffect(() => {
    if (status === 'Working') {
      const screenshotInterval = setInterval(() => {
        takeScreenshot();
      }, 5 * 60 * 1000); // Every 5 minutes

      return () => clearInterval(screenshotInterval);
    }
  }, [status]);

  // Start or stop recording based on isRecording state
  useEffect(() => {
    if (isRecording) {
      startScreenRecording();
    } else {
      stopScreenRecording();
    }
  }, [isRecording]);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-2xl font-bold mb-4">
        <h1>Employee Activity Tracker</h1>
        <p>Status: {status}</p>
        <p>Screenshots Taken: {screenshotCount}</p>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
    </div>
  );
};

export default ScreenActivityTracker;
