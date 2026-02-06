import { Search, Plus, SlidersHorizontal, Trash2, Milk } from "lucide-react";
import { useState, useEffect } from "react";
import { productAPI } from "../../utils/api";
import AddProductModal from '../../components/modals/AddProductModal';

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
        // Handle case where data might be { data: [...] } or an array
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
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Products
          </h2>

          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="p-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-600 text-white p-2 rounded"
                >
                  Add Product
                </button>
                <AddProductModal
                  isOpen={isModalOpen}
                  closeModal={() => setIsModalOpen(false)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={20} />
                <span className="font-medium">Sort and Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-6 bg-red-50 border-b border-red-200">
            <p className="text-red-700 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No products found</p>
          </div>
        ) : (
          /* Table Section */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Milk size={24} className="text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.dateCreated}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
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
  );
};

export default ProductTable;
