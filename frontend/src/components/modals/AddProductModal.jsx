import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddProductModal({ isOpen, onClose, onCreated }) {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // Colors state for admin input
  const [colors, setColors] = useState([]);
  const [input, setInput] = useState("");

  const [form, setForm] = useState({
    product_name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  // Handle Enter key for adding colors
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newColor = input.trim();
      if (newColor && !colors.includes(newColor)) {
        setColors([...colors, newColor]);
      }
      setInput("");
    }
  };

  // Remove a color from array
  const handleRemoveColor = (colorToRemove) => {
    setColors(colors.filter((c) => c !== colorToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!form.product_name.trim()) return alert("Product name is required");
    if (!form.category) return alert("Category is required");
    if (!form.price || parseFloat(form.price) <= 0)
      return alert("Valid price is required");
    if (!form.quantity || parseInt(form.quantity) <= 0)
      return alert("Valid quantity is required");
    if (!form.description.trim()) return alert("Description is required");
    if (colors.length === 0) return alert("At least one color is required");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      images.forEach((img) => formData.append("images", img));

      // Append colors as JSON string (backend should parse it)
      formData.append("colors", JSON.stringify(colors));

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onCreated?.(data.data);
      onClose();

      // Reset form
      setForm({
        product_name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });
      setImages([]);
      setPreview([]);
      setColors([]);
      setInput("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[641px] max-w-2xl rounded-[8px] shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-1 px-6 py-2">
          <h2 className="text-[20px] font-[600]">Add Product</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <hr className="bg-black mb-1" />

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-2">
          {/* Images Upload */}
          <p className="text-[16px] font-[600]">Product Images</p>
          <label className="border-2 bg-[#F6F6F6] rounded-[8px] p-8 text-center cursor-pointer block">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImages}
            />
            <p className="text-gray-500">
              <span className="font-[600]">Click to upload </span>or drag and drop
              <br />
              <span className="text-[12px]">maximum of 3 images</span>
            </p>
          </label>

          {preview.length > 0 && (
            <div className="space-y-2">
              {preview.map((src, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border rounded-xl p-2"
                >
                  <img src={src} className="h-10 w-10 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="product_name"
              placeholder="Product Name"
              className="border px-3 rounded-xl"
              onChange={handleChange}
              value={form.product_name}
              required
            />
            <input
              name="quantity"
              placeholder="Quantity"
              type="number"
              className="border p-3 rounded-xl"
              onChange={handleChange}
              value={form.quantity}
              required
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              onChange={handleChange}
              value={form.category}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">Select a category</option>
              <option value="Beaded Necklace">Beaded Necklace</option>
              <option value="Beaded Tops">Beaded Tops</option>
              <option value="Beaded Bags">Beaded Bags</option>
              <option value="Beaded Bracelet">Beaded Bracelet</option>
            </select>

            <input
              name="price"
              placeholder="Price"
              type="number"
              className="border p-3 rounded-xl"
              onChange={handleChange}
              value={form.price}
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Color Input */}
          <div className="mb-4">
            <label className="font-medium inter mb-2 block">Colors:</label>
            <input
              type="text"
              placeholder="Type a color and press Enter"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border p-2 rounded w-full"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {colors.map((color, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                  onClick={() => handleRemoveColor(color)}
                  title="Click to remove"
                >
                  {color} ✕
                </span>
              ))}
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded-xl w-full"
            rows="3"
            onChange={handleChange}
            value={form.description}
            required
          />

          {/* Footer */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-[14px] rounded-[4px]"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-4 py-2 bg-[#1F2937] text-white text-[14px] rounded-[4px]"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
