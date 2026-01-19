export default function FilterSidebar({ filters, setFilters }) {
  return (
    <div className="w-[280px] hidden md:block border-r border-gray-200 pr-5">

      {/* TITLE */}
      <h3 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">
        FILTER BOOKS
      </h3>

      {/* ================= LANGUAGE ================= */}
      <div className="mb-5">
        <div className="bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 tracking-wide">
          LANGUAGE
        </div>

        <div className="bg-gray-100 px-3 py-3">
          <select
            value={filters.language || ""}
            className="w-full bg-transparent text-sm font-light text-gray-700 outline-none"
            onChange={(e) =>
              setFilters({ ...filters, language: e.target.value })
            }
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* ================= CATEGORY ================= */}
      <div className="mb-5">
        <div className="bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 tracking-wide">
          CATEGORY
        </div>

        <div className="bg-gray-100 px-3 py-3">
          <select
            value={filters.category || ""}
            className="w-full bg-transparent text-sm font-light text-gray-700 outline-none"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>

            {/* value MUST match DB */}
            <option value="fiction">Fiction</option>
            <option value="romance">Romance</option>
            <option value="self-help">Self Help</option>
                        <option value="education">Education</option>
                                    <option value="biography">Biography</option>
          </select>
        </div>
      </div>

      {/* ================= PRICE RANGE ================= */}
      <div className="mb-5">
        <div className="bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 tracking-wide">
          PRICE RANGE
        </div>

        <div className="bg-gray-100 px-3 py-3 space-y-3">
          <select
            value={filters.minPrice || ""}
            className="w-full bg-transparent text-sm font-light text-gray-700 outline-none"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          >
            <option value="">Min Price</option>
            <option value="100">₹100</option>
            <option value="300">₹300</option>
            <option value="500">₹500</option>
          </select>

          <select
            value={filters.maxPrice || ""}
            className="w-full bg-transparent text-sm font-light text-gray-700 outline-none"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          >
            <option value="">Max Price</option>
            <option value="500">₹500</option>
            <option value="1000">₹1000</option>
            <option value="2000">₹2000</option>
          </select>
        </div>
      </div>

      {/* ================= CLEAR FILTER ================= */}
      <button
        onClick={() => setFilters({})}
        className="text-xs text-red-500 underline"
      >
        Clear Filters
      </button>

    </div>
  );
}
