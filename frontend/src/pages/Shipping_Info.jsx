import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  state: ""
};

export default function CustomerAddressCard() {
  const [formData, setFormData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const sanitized = stored.map((item) => ({
      ...item,
      price: typeof item.price === "number" ? item.price : 0,
      quantity: typeof item.quantity === "number" ? item.quantity : 1,
    }));
    setCart(sanitized);
  }, []);

  const total = cart.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + price * quantity;
  }, 0);

  // Load saved customer data
  useEffect(() => {
    const saved = localStorage.getItem("customerInfo");
    if (saved) {
      setFormData(JSON.parse(saved));
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Nigerian phone number.");
      return;
    }

    if (!formData.state) {
      toast.error("Please select a state/province.");
      return;
    }

    localStorage.setItem("customerInfo", JSON.stringify(formData));
    setIsEditing(false);
    toast.success("Information saved!");
  };

  const handleCheckout = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartSummary = cart.map(item => ({
        id: item.id,
        product_name: item.product_name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
      }));

      const payload = {
        ...formData,
        cart: cartSummary,
      };

      await fetch("https://formspree.io/f/xkgbjvwy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      localStorage.setItem("orderSummary", JSON.stringify(cartSummary));
      localStorage.setItem("orderTotal", total);
      localStorage.removeItem("cart");
      window.location.href = "/accountdetail";
    } catch {
      toast.error("Failed to send checkout info");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 inter md:mt-[7rem] mb-7 mt-[7.6rem]">
        <ToastContainer toastClassName="poppins" />
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-700 font-semibold">CUSTOMER ADDRESS</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-orange-500 text-sm font-medium flex items-center gap-1"
            >
              <FaEdit className="inline-block" />
              Change
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="text"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="text"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="email"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              defaultValue="+234"
              type="tel"
              className="w-full border p-2 rounded"
            />
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select State/Province</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Rivers">Rivers</option>
            </select>

            <div className="flex justify-between pt-2">
              <button
                onClick={handleSave}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-800">
            <p className="font-medium">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="text-gray-600 truncate">{formData.address}</p>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-gray-600">{formData.phone}</p>
            <p className="text-gray-600">{formData.state}</p>
          </div>
        )}

        {!isEditing && (
          <div>
            <div className="w-full border p-4 mt-4 rounded shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold mb-4">
                <span>
                  Cart Total <span className="text-sm">({cart.length} items)</span>
                </span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <button
                className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </div>

            <div className="max-w-6xl mx-auto mt-10 bg-white border border-gray-200 p-6 rounded-md shadow">
              <h2 className="font-medium">Shipping info</h2>
              <p className="mt-2 mb-1">5 - 7 Business days shipping time</p>
              <p className="font-semibold">₦{total.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">
                Total Delivery Time = Production Time + Shipping Time
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
