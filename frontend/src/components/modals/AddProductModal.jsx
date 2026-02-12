import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddProductModal({ isOpen, onClose, onCreated }) {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const newImages = images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);
    setImages(newImages);
    setPreview(newPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!form.product_name.trim()) {
      alert("Product name is required");
      setLoading(false);
      return;
    }
    if (!form.category) {
      alert("Category is required");
      setLoading(false);
      return;
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      alert("Valid price is required");
      setLoading(false);
      return;
    }
    if (!form.quantity || parseInt(form.quantity) <= 0) {
      alert("Valid quantity is required");
      setLoading(false);
      return;
    }
    if (!form.description.trim()) {
      alert("Description is required");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img); // Changed from "image" to "images"
      });

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
        <div className="flex justify-between items-center mb-2 px-6 py-3">
          <h2 className="text-[20px] font-[600]">Add Product</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <hr className="bg-black mb-2" />

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-3">
          {/* Upload */}

          <p className="text-[16px] font-[600]">Product Image</p>
          <label className="border-2 bg-[#F6F6F6] rounded-[8px] p-8 text-center cursor-pointer block">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImages}
            />
            <p className="text-gray-500">
              <span className="font-[600]">Click to upload </span>or drag and
              drop
              <br />
              <span className="text-[12px]">maximum of 3 images</span>
            </p>
          </label>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="space-y-2">
              {preview.map((src, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border rounded-xl p-2"
                >
                  <img src={src} className="h-12 w-12 object-cover rounded" />
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
              className="border p-3 rounded-xl"
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

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded-xl w-full"
            rows="4"
            onChange={handleChange}
            value={form.description}
            required
          />

          {/* Footer */}
          <div className="flex justify-between pt-4">
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
