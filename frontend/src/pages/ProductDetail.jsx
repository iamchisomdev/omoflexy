import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaCheck } from "react-icons/fa";
import Recommendation from "../components/Recommendation";
import { productAPI } from "../utils/api";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProduct(id);
        setProduct(data);
        
        // Set default color if available
        if (data?.colors?.length) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Find item with matching ID AND color
    const itemIndex = cart.findIndex(
      (item) => item.id === product.id && item.color === selectedColor
    );
    
    if (itemIndex > -1) {
      // If product with this color exists, increase its quantity
      cart[itemIndex].quantity += quantity;
    } else {
      // If product with this color does not exist, add it
      cart.push({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        quantity: quantity,
        color: selectedColor,
        product_image: product.product_image,
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // Trigger update
  };

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] mt-[7rem]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] mt-[7rem]">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Product not found.</p>
            <a 
              href="/" 
              className="text-black underline hover:text-gray-700"
            >
              Return to home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <Navbar />

      {/* Main Product Section */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-[7rem]">
        {/* Product Image */}
        <div className="flex">
          <div className="w-[100%] h-[100%] flex text-gray-400 text-4xl relative">
            <span className="absolute top-2 left-2 bg-[#F4EBD0] text-white text-xs px-1 py-1 rounded-[4px]">
              🔥
            </span>
            <img src={product.product_image} alt={product.product_name} />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-2 inter">
            {product.product_name}
          </h1>
          <p className="text-lg text-[#806B07] font-bold mb-4 inter">
            ₦{product.price}
          </p>

          {/* Color Options */}
          <div className="mb-4">
            <span className="font-medium mr-2 inter">Color:</span>
            <div className="flex space-x-2">
              {product?.colors?.map((color, idx) => (
                <button
                  key={idx}
                  className="w-8 h-8 rounded border border-gray-400 relative"
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <FaCheck
                      className="absolute inset-0 m-auto"
                      style={{
                        color: color.toLowerCase() === "white" ? "black" : "white",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4 inter mb-5">
            <label className="block mb-1 font-medium">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={decrease}
                className="w-8 h-8 flex items-center justify-center bg-[#FEF9E9] text-black rounded"
              >
                –
              </button>
              <span className="w-8 h-8 flex items-center justify-center rounded-t-none border-gray-300 rounded">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="w-8 h-8 flex items-center justify-center bg-black text-white border-l-0 rounded"
              >
                +
              </button>
              <p className="ml-4 text-sm text-gray-600">
                Each Bag takes <strong>5–7 days</strong>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 poppins">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-black text-[#FFFFFF] py-3 items-center inline-flex justify-center rounded hover:bg-gray-900 transition inter"
            onClick={handleAddToCart}
          >
            ADD TO CART
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 14H13.3553C17.2819 14 17.8791 11.5332 18.6034 7.93541C18.8123 6.89769 18.9168 6.37883 18.6656 6.03315C18.4655 5.75781 18.1192 5.70179 17.5 5.69038"
                stroke="white"
                strokeWidth="1.3125"
                strokeLinecap="round"
              />
              <path
                d="M7.875 5.6875H14.875M11.375 9.1875V2.1875"
                stroke="white"
                strokeWidth="1.3125"
                strokeLinecap="round"
              />
              <path
                d="M7 14L4.70639 3.07556C4.51163 2.29652 3.81166 1.75 3.00864 1.75H2.1875"
                stroke="white"
                strokeWidth="1.3125"
                strokeLinecap="round"
              />
              <path
                d="M7.77 14H7.41C6.21707 14 5.25 15.0074 5.25 16.25C5.25 16.4571 5.41117 16.625 5.61 16.625H15.3125"
                stroke="white"
                strokeWidth="1.3125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.1875 19.25C9.91237 19.25 10.5 18.6624 10.5 17.9375C10.5 17.2126 9.91237 16.625 9.1875 16.625C8.46263 16.625 7.875 17.2126 7.875 17.9375C7.875 18.6624 8.46263 19.25 9.1875 19.25Z"
                stroke="white"
                strokeWidth="1.3125"
              />
              <path
                d="M15.3125 19.25C16.0374 19.25 16.625 18.6624 16.625 17.9375C16.625 17.2126 16.0374 16.625 15.3125 16.625C14.5876 16.625 14 17.2126 14 17.9375C14 18.6624 14.5876 19.25 15.3125 19.25Z"
                stroke="white"
                strokeWidth="1.3125"
              />
            </svg>
          </button>
        </div>
      </main>

      {/* Recommendations */}
      <Recommendation />
      <Footer />
    </div>
  );
};

export default ProductDetail;