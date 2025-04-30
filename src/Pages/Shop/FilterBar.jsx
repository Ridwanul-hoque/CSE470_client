import React from "react";

const FilterBar = ({ filterTag, setFilterTag, sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
      <div className="space-x-2">
        <button onClick={() => setFilterTag("all")} className="px-3 py-1 border rounded">All</button>
        <button onClick={() => setFilterTag("secondhand")} className="px-3 py-1 border rounded">Second Hand</button>
        <button onClick={() => setFilterTag("smallbusiness")} className="px-3 py-1 border rounded">Small Business</button>
      </div>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="default">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default FilterBar;