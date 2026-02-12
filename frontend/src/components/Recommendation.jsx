import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../utils/api";

const Recommendation = ({ currentCategory, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper: pick n random items from an array
  const getRandomItems = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();
        console.log("API Response:", response);

        const allProducts = Array.isArray(response.data) ? response.data : [];

        if (!allProducts.length) {
          console.warn("No products found from API");
          setProducts([]);
          return;
        }

        // Filter by category and exclude current product
        const categoryProducts = currentCategory
          ? allProducts.filter(
              (p) =>
                p.category === currentCategory && p.id !== currentProductId
            )
          : allProducts.filter((p) => p.id !== currentProductId);

        // Pick up to 4 random recommended products
        let recommended = getRandomItems(categoryProducts, 4);

        // If fewer than 4, fill with other random products
        if (recommended.length < 4) {
          const remaining = allProducts.filter(
            (p) => !recommended.includes(p) && p.id !== currentProductId
          );
          recommended = [
            ...recommended,
            ...getRandomItems(remaining, 4 - recommended.length),
          ];
        }

        setProducts(recommended);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentProductId]);

  if (loading) {
    return <div className="px-4 md:px-16 py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="px-4 md:px-16 py-8 text-red-500">{error}</div>;
  }

  if (!products.length) {
    return <div className="px-4 md:px-16 py-8">No recommended products</div>;
  }

  return (
    <div className="px-4 md:px-16 py-8">
      <h2 className="text-xl font-semibold mb-6 inter">
        You may also like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(
          ({ id, product_name, category, price, product_images }) => (
            <Link to={`/product/${id}`} key={id}>
              <div className="w-full h-40 bg-white flex items-center justify-center relative">
                <span className="absolute top-2 left-2 bg-[#F4EBD0] text-white text-xs px-1 py-1 rounded-[4px]">
                  🔥
                </span>
                <img
                  src={product_images}
                  alt={product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#FEF9E9] p-4">
                <h3 className="text-sm font-medium inter">{product_name}</h3>

                <div className="md:inline-flex justify-between items-center w-full">
                  <p className="font-semibold text-black mt-1 inter">
                    ₦{price?.toLocaleString()}
                  </p>
                  <p className="text-gray-700 text-xs inter">{category}</p>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Recommendation;
