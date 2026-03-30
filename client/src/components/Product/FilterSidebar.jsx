import RatingStars from './RatingStars'

const categories = ['Electronics', 'Mobile Phones', 'Fashion', 'Home & Kitchen', 'Books', 'Appliances']
const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 - ₹20,000', min: 5000, max: 20000 },
  { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
  { label: 'Over ₹50,000', min: 50000, max: Infinity }
]

const FilterSidebar = ({ filters, setFilters }) => {
  const toggleCategory = (cat) => {
    setFilters(prev => {
      const cats = prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
      return { ...prev, categories: cats }
    })
  }

  return (
    <div className="w-full">
      {/* Category */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2 text-[#0F1111]">Category</h3>
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-2 py-0.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-[#007185]"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2 text-[#0F1111]">Price</h3>
        {priceRanges.map((range, i) => (
          <label key={i} className="flex items-center gap-2 py-0.5 text-sm cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.priceRange?.label === range.label}
              onChange={() => setFilters(prev => ({ ...prev, priceRange: range }))}
              className="accent-[#007185]"
            />
            {range.label}
          </label>
        ))}
        <button
          onClick={() => setFilters(prev => ({ ...prev, priceRange: null }))}
          className="text-[#007185] text-xs mt-1 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2 text-[#0F1111]">Customer Review</h3>
        {[4, 3, 2, 1].map(r => (
          <div
            key={r}
            onClick={() => setFilters(prev => ({ ...prev, minRating: r }))}
            className={`flex items-center gap-1 py-0.5 cursor-pointer ${filters.minRating === r ? 'font-bold' : ''}`}
          >
            <RatingStars rating={r} />
            <span className="text-sm">& Up</span>
          </div>
        ))}
        <button
          onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
          className="text-[#007185] text-xs mt-1 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Prime */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.primeOnly}
            onChange={() => setFilters(prev => ({ ...prev, primeOnly: !prev.primeOnly }))}
            className="accent-[#007185]"
          />
          <span className="font-bold text-[#007185]">Prime</span> Eligible
        </label>
      </div>
    </div>
  )
}

export default FilterSidebar
