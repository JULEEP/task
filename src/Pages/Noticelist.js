import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx"; // Import XLSX for exporting data
import { saveAs } from "file-saver"; // Import file-saver for saving files

export default function OrderList() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    zip: "",
    address: "",
    email: "",
  });
  const [orders, setOrders] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    // Fetch orders from the API on component mount
    axios
      .get("https://school-backend-1-2xki.onrender.com/api/orders/all")
      .then((response) => {
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    // Simulate delete action (since no backend is connected)
    axios
      .delete(`https://school-backend-1-2xki.onrender.com/api/orders/delete/${selectedOrder._id}`)
      .then((response) => {
        if (response.data.success) {
          setOrders(orders.filter((order) => order._id !== selectedOrder._id));
          setDeleteModal(false);
          setSuccessModal(true);
        } else {
          console.error("Failed to delete order");
        }
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const handleEdit = () => {
    // Simulate edit action
    axios
      .put(`https://school-backend-1-2xki.onrender.com/api/orders/update/${selectedOrder._id}`, formData)
      .then((response) => {
        if (response.data.success) {
          const updatedOrders = orders.map((order) =>
            order._id === selectedOrder._id ? { ...order, ...formData } : order
          );
          setOrders(updatedOrders);
          setEditModal(false);
          setSuccessModal(true);
        } else {
          console.error("Failed to update order");
        }
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  // Pagination: Get the current page's orders
  const filteredOrders = orders.filter((order) =>
    order.firstName ? order.firstName.toLowerCase().includes(search.toLowerCase()) : ''
  );
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Export function for CSV and Excel
  const exportData = (type) => {
    const filteredOrders = orders.filter((order) =>
      order.firstName.toLowerCase().includes(search.toLowerCase())
    );
    const ws = XLSX.utils.json_to_sheet(filteredOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Export based on type (CSV or XLSX)
    if (type === "csv") {
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv" });
      saveAs(blob, "orders.csv");
    } else if (type === "xlsx") {
      XLSX.writeFile(wb, "orders.xlsx");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-900">DeliveryDetails List</h2>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => exportData("csv")}>CSV</button>
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => exportData("xlsx")}>Excel</button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <input
          className="w-1/3 p-2 border rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Wrapper with overflow */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-600">
              <th className="p-2 border text-white">Sl</th>
              <th className="p-2 border text-white">First Name</th>
              <th className="p-2 border text-white">Last Name</th>
              <th className="p-2 border text-white">City</th>
              <th className="p-2 border text-white">Zip</th>
              <th className="p-2 border text-white">Address</th>
              <th className="p-2 border text-white">Email</th>
              <th className="p-2 border text-white">Created At</th>
              <th className="p-2 border text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border text-center">{order.firstName}</td>
                <td className="p-2 border text-center">{order.lastName}</td>
                <td className="p-2 border text-center">{order.city}</td>
                <td className="p-2 border text-center">{order.zip}</td>
                <td className="p-2 border text-center">{order.address}</td>
                <td className="p-2 border text-center">{order.email}</td>
                <td className="p-2 border text-center">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="bg-blue-500 text-white p-2 rounded flex justify-center items-center"
                      onClick={() => {
                        setEditModal(true);
                        setSelectedOrder(order);
                        setFormData(order);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="bg-red-500 text-white p-2 rounded flex justify-center items-center"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Edit Order Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Edit Order</h2>

            <input
              className="w-full p-2 border rounded mb-2"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="Zip"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</h2>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Order has been successfully updated!</h2>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
