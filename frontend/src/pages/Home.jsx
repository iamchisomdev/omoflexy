import React from "react";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import image1 from "../assets/image/image1.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productAPI } from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        
        if (response.success) {
          setProducts(response.data || []);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const defaultCount = isMobile ? 4 : 8;
  const visibleProducts = showAll ? products : products.slice(0, defaultCount);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="md:mt-[7rem] mt-[7.6rem] ">
        <img
          src={image1}
          alt="Beaded Bag"
          className="w-full h-50 object-cover"
        />
      </div>

      <div className="px-3 md:px-16 py-8">
        <h2 className="text-xl font-semibold mb-6 inter">🔥 Trending Beads</h2>

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {visibleProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {visibleProducts.map(
                  ({ id, product_name, category, price, product_image }) => (
                    <Link to={`/product/${id}`} key={id} className="">
                      <div className="w-full h-40 bg-white flex items-center justify-center relative">
                        <span className="absolute top-2 left-2 bg-[#F4EBD0] text-white text-xs px-1 py-1 rounded-[4px]">
                          🔥
                        </span>
                        <img
                          src={product_image}
                          alt={product_name}
                          className="w-[100%] h-[100%] object-cover"
                        />
                      </div>
                      <div className="bg-[#FEF9E9] p-4">
                        <h3 className="text-sm font-medium inter">
                          {product_name}
                        </h3>
                        <div className="md:inline-flex justify-between items-center w-full">
                          <p className="font-semibold text-black mt-1 inter">
                            ₦{price.toLocaleString()}
                          </p>
                          <p className="text-gray-700 text-xs inter">
                            {category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}

            {products.length > defaultCount && (
              <div className="flex justify-center mt-10">
                <button
                  className="px-6 py-2 border bg-[#D4AF37] text-[#FFFFFF] rounded poppins inline-flex items-center"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? "Show Less" : "Show More"}
                  {showAll ? (
                    <FaArrowUp className="ml-2" />
                  ) : (
                    <FaArrowDown className="ml-2" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;