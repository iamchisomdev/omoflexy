import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Recommendation = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  return (
    //   {/* You May Like Section */}
    <div className="px-4 md:px-16 py-8">
      <h2 className="text-xl font-semibold mb-6 inter">You may also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map(
          ({ id, product_name, category, price, product_image }) => (
            <a href={`/product/${id}`} key={id} className="">
              <div className="w-full h-40 bg-white flex items-center justify-center relative">
                <span className="absolute top-2 left-2 bg-[#F4EBD0] text-white text-xs px-1 py-1 rounded-[4px]">
                  🔥
                </span>
                <img
                  src={product_image}
                  alt={product_name}
                  className="w-[100%] h-[100%]"
                />
              </div>
              <div className="bg-[#FEF9E9] p-4">
                <h3 className="text-sm font-medium inter">{product_name}</h3>
                <div className="md:inline-flex justify-between items-center w-full">
                  <p className="font-semibold text-black mt-1 inter">
                    ₦{price.toLocaleString()}
                  </p>
                  <p className="text-gray-700 text-xs inter">{category}</p>
                </div>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default Recommendation;
