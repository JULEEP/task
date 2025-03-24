import { useState } from "react";
import { FaTruckFast } from "react-icons/fa6"; // Importing the delivery truck icon
import axios from "axios"; // Importing axios for API requests
import { useNavigate } from "react-router-dom";


export default function Delivery() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    zip: "",
    address: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://school-backend-1-2xki.onrender.com/api/orders/add", formData)
      .then((response) => {
        console.log("Order Created:", response.data);
        setSuccessMessage("Order has been successfully placed!");
        setFormData({
          firstName: "",
          lastName: "",
          city: "",
          zip: "",
          address: "",
          email: "",
        });

        // Redirect to /deliverydetails-list after successful order creation
        navigate("/deliverydetails-list");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };


   // Handle Go Back button click
   const handleGoBack = () => {
    navigate("/coming-soon");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      {/* Container with white border and blue gradient background */}
      <div className="w-[90%] h-[90%] border-8 mr-8 border-white bg-gradient-to-r from-blue-900 to-blue-300 flex justify-between items-center p-8 ml-10">
        {/* Left side content */}
        <div className="flex flex-col items-start space-y-4 ml-16">
          {/* Delivery truck icon */}
          <FaTruckFast className="text-white text-6xl mb-4" />

          {/* Welcome text */}
          <h1 className="text-2xl font-bold text-white mb-4">Welcome</h1>

          {/* Text sections */}
          <h1 className="text-sm font-bold text-white">You are 30 seconds away from</h1>
          <h2 className="text-sm font-semibold text-white">Completing your order!</h2>

{/* Go Back button with onClick to navigate to /coming-soon */}
<button
onClick={handleGoBack}
className="mt-6 px-6 py-2 rounded-full bg-white text-blue-700 font-semibold text-lg hover:bg-gray-200"
>
Go Back
</button>
        </div>

        {/* Right side form */}
        <div className="w-[90%] h-[90%] bg-white p-6 rounded-l-full shadow-lg ml-2">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-12">
              {/* First Name & Last Name */}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 ml-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 ml-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* City & Zip */}
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 ml-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full p-3 ml-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Address & Email in the same row */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 ml-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 ml-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Place Order Button */}
            <div className="flex justify-end mt-6">
              <button className="py-2 px-8 mt-8 rounded-full bg-blue-700 text-white font-semibold text-lg hover:bg-blue-800">
                Place Order
              </button>
            </div>
          </form>

  {/* Success message (top-right corner) */}
  {successMessage && (
    <div className="fixed top-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-lg">
      {successMessage}
    </div>
  )}
        </div>
      </div>
    </div>
  );
}
