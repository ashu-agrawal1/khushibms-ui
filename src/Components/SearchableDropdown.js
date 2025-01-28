import { useState } from "react";

const SearchableDropdown = ({
  label,
  products,
  currProduct,
  setCurrProduct,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-2">
      <label className="block text-lg font-medium text-white">{label}</label>
      <div className="relative">
        {/* Dropdown Header */}
        <div
          className="block w-full rounded-md pl-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {currProduct
            ? products.find((product) => product._id === currProduct)?.name ||
              "Select a product"
            : "Select a product"}
        </div>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full rounded-t-md px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:outline-indigo-600"
            />

            {/* Dropdown Options */}
            <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <li
                    key={item._id}
                    className="px-3 py-2 bg-white hover:bg-[#B6D5FF] text-gray-900 cursor-pointer"
                    onClick={() => {
                      setCurrProduct(item._id);
                      setIsDropdownOpen(false); // Close dropdown
                      setSearchQuery(""); // Clear search input
                    }}
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No products found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
