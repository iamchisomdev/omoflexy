import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { productAPI } from "../utils/api";
import Navbar from "../components/Navbar";
import Recommendation from "../components/Recommendation";
import Footer from "../components/Footer";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        const data = await productAPI.searchProducts(searchQuery);
        const products = Array.isArray(data) ? data : (data?.data || data?.products || []);
        if (!cancelled) setResults(products);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Search error', err);
        if (!cancelled) setResults([]);
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [searchQuery]);

  return (

    <div>

      <Navbar />


      <div className="p-4 md:mt-[7rem] mt-[7.6rem]">
        <h1 className="mb-4 text-xl font-semibold inter">
          Search Results for "{searchQuery}"
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-full h-40 bg-white flex items-center justify-center relative">
                  <span className="absolute top-2 left-2 bg-[#F4EBD0] text-white text-xs px-1 py-1 rounded-[4px]">
                    🔥
                  </span>
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-[100%] h-[100%]"
                  />
                </div>
                <div className="bg-[#FEF9E9] p-4">
                  <h3 className="text-sm font-medium inter">{product.product_name}</h3>
                  <div className="md:inline-flex justify-between items-center w-full">
                    <p className="font-semibold text-black mt-1 inter">
                      ₦{product.price}
                    </p>
                    <p className="text-gray-700 text-xs inter">{product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center text-gray-500 inter">
            No results found for "{searchQuery}"
          </div>
        ) : (
          <div className="text-center text-gray-500 inter">
            Enter a search term to find products
          </div>
        )}
      </div>

      <Recommendation />
      < Footer />

    </div>

  );
};

export default SearchPage;