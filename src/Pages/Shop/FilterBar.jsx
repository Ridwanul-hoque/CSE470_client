import React from "react";

const FilterBar = ({ filterTag, setFilterTag, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4 p-4 bg-white rounded-xl shadow-md">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "All", value: "all" },
          { label: "Second Hand", value: "used" },
          { label: "Small Business", value: "business" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilterTag(value)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
              filterTag === value
                ? "bg-gradient-to-r from-[#FE5F75] to-[#0D0D2B] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE5F75] transition duration-200"
        >
          <option value="default">Sort by</option>
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
