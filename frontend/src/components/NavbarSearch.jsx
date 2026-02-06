import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../utils/supabase";

const NavbarSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Check screen size and set mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      // If switching to desktop view, hide mobile search
      if (window.innerWidth >= 768) {
        setShowMobileSearch(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside for mobile search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on query
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const products = getProducts();

    // Filter products based on query
    const filtered = products.filter(
      (product) =>
        (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
    );

    // Get unique categories from filtered products
    const uniqueCategories = Array.from(
      new Set(filtered.map((product) => product.category))
    );

    // Prepare suggestions: one per category
    const categorySuggestions = uniqueCategories.map((category) => {
      // Find a representative product for each category
      const product = filtered.find((p) => p.category === category);
      return { ...product, category };
    });

    setSuggestions(categorySuggestions);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setSuggestions([]);
      setShowMobileSearch(false);
    }
  };

  // Removed unused handleSuggestionClick function

  const handleMobileSearchClick = () => {
    setShowMobileSearch(true);
  };

  const handleBackClick = () => {
    setShowMobileSearch(false);
  };

  return (
    <div className="flex items-center" ref={searchRef}>
      
      <div className={`hidden md:block ${showMobileSearch ? 'hidden' : 'block'}`}>
        <form onSubmit={handleSearch} className="">
          <div
            className="w-64 rounded-[20px] border border-gray-300 inline-flex items-center focus:border-gray-300 py-1 pl-4 pr-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          >
            <input
              type="text"
              placeholder="Search beads"
              className="focus:outline-none"
            />
            <button
              type="submit"
              className="op-2.5 text-white bg-black p-1 rounded-[20px]"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
              <ul className="py-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.category}
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(suggestion.category)}`);
                      setShowMobileSearch(false);
                      setQuery('');
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    <div className="font-medium text-gray-900">{suggestion.category}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      {/* Mobile Search Icon - Only shown on mobile when search is collapsed */}
      {isMobileView && !showMobileSearch && (
        <button
          onClick={handleMobileSearchClick}
          className="text-white md:hidden"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}

      {/* Mobile Search Expanded - Only shown on mobile when activated */}
      {isMobileView && showMobileSearch && (
        <div className="absolute left-0 right-0 top-0 z-50 flex items-center inter bg-white p-2 shadow-md md:hidden">
          <button
            onClick={handleBackClick}
            className="mr-2 text-gray-600"
            aria-label="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <form onSubmit={handleSearch} className="flex-1">
            <input
              type="text"
              placeholder="Search beads"
              className="w-full rounded-[20px] border border-gray-300 py-2 px-4 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </form>
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
              <ul className="py-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.category}
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(suggestion.category)}`);
                      setShowMobileSearch(false);
                      setQuery('');
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    <div className="font-medium text-gray-900">{suggestion.category}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;