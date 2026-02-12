import { Search, Plus, SlidersHorizontal, Trash2, Milk } from "lucide-react";
import { useState, useEffect } from "react";
import { productAPI } from "../../utils/api";
import AddProductModal from "../../components/modals/AddProductModal";
import Sidebar from "../../components/Admin/Sidebar";
import Logo from "../../assets/image/logo1.jpg"; // Adjust path to your logo image

// Laptop only wrapper (no logic changed)
const LaptopOnly = ({ children }) => (
  <div className="min-h-screen inter">
    <div className="block lg:hidden h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Laptop Only</h1>
        <p className="text-gray-600">
          This admin dashboard is only accessible on a laptop or large screen.
        </p>
      </div>
    </div>
    <div className="hidden lg:block">{children}</div>
  </div>
);

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getAllProducts();
        const productsList = Array.isArray(data)
          ? data
          : data?.data || data?.products || [];
        setProducts(productsList);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product handler
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await productAPI.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  return (
    <LaptopOnly>
      <div className="">
        <img
          src={Logo}
          alt="Logo"
          className="w-50 h-50 ml-5 my-2 object-contain"
        />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 py-5 min-h-screen inter">
            <div className="bg-white">
              {/* Header Section */}
              <div className="py-2">
                <h2 className="text-[20px] font-semibold text-gray-800 mb-3 px-5">
                  My Products
                </h2>
                <hr className="mb-5" />
                <div className="flex items-center justify-between mb-6 w-[100%] px-5">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search Products..."
                      className="w-[100%] pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-[4px] shadow hover:opacity-90"
                    >
                      <Plus size={18} />
                      Add Product
                    </button>

                    <AddProductModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)} // ✅ correct prop name
                      onCreated={(newProduct) =>
                        setProducts([newProduct, ...products])
                      } // optional: add new product immediately
                    />

                    <button className="flex items-center gap-2 px-[7px] py-[10px] border border-gray-200 rounded-[4px] hover:bg-gray-50">
                      <SlidersHorizontal size={18} />
                      <span className="font-medium">Sort and Filter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 font-medium">Error: {error}</p>
                </div>
              )}

              {/* Loading */}
              {loading ? (
                <div className="p-12 text-center text-gray-500">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  No products found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-y border-gray-100">
                      <tr className="text-left">
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Product Name
                        </th>
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Category
                        </th>
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Date Created
                        </th>
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Product Quantity
                        </th>
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Price
                        </th>
                        <th className="px-8 py-4 font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">
                                {product.product_name}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-8 py-5 text-gray-600">
                            {product.created_at
                              ? new Date(product.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )
                              : "N/A"}
                          </td>

                          <td className="px-8 py-5 text-gray-600">
                            {product.quantity}
                          </td>
                          <td className="px-8 py-5 font-semibold text-gray-900">
                            {product.price.toLocaleString()}
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="flex items-center gap-1.5 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                                <span className="font-medium">Delete</span>
                              </button>
                              <button className="font-medium text-gray-700 hover:text-gray-900">
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LaptopOnly>
  );
};

export default ProductTable;
