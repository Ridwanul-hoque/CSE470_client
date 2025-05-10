import React from "react";

const FilterBar = ({ filterTag, setFilterTag, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setFilterTag("all")}
          className={`px-3 py-1 rounded ${filterTag === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterTag("used")} // 🛠 CORRECTED TAG
          className={`px-3 py-1 rounded ${filterTag === "used" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Second Hand
        </button>
        <button
          onClick={() => setFilterTag("business")} // 🛠 CORRECTED TAG
          className={`px-3 py-1 rounded ${filterTag === "business" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Small Business
        </button>
      </div>

      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
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
