const SortDropdown = ({ sort, setSort }) => {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-[#F0F2F2] hover:bg-[#e3e6e6] cursor-pointer outline-none"
    >
      <option value="relevance">Sort by: Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Avg. Customer Review</option>
      <option value="discount">Discount</option>
    </select>
  )
}

export default SortDropdown
