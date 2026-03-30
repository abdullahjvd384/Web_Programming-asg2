import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { searchProducts, clearSearchResults } from '../../store/slices/productSlice'

const categories = ['All', 'Electronics', 'Mobile Phones', 'Fashion', 'Home & Kitchen', 'Books', 'Appliances']

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { searchResults } = useSelector(state => state.products)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    if (val.trim()) {
      setShowSuggestions(true)
      debounceRef.current = setTimeout(() => {
        dispatch(searchProducts(val))
      }, 300)
    } else {
      setShowSuggestions(false)
      dispatch(clearSearchResults())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setShowSuggestions(false)
      const categoryParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : ''
      navigate(`/search?q=${encodeURIComponent(query.trim())}${categoryParam}`)
    }
  }

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false)
    setQuery(product.title)
    navigate(`/products/${product._id}`)
  }

  return (
    <div className="flex-1 relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex rounded-md overflow-hidden">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#e6e6e6] text-[#555] text-xs px-2 py-2 border-none outline-none rounded-l-md hidden sm:block"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search Amazon.in"
          className="flex-1 px-3 py-2 text-sm outline-none border-none min-w-0"
        />
        <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-3 py-2 rounded-r-md">
          <FiSearch size={20} className="text-[#131921]" />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchResults.slice(0, 8).map(product => (
            <div
              key={product._id}
              onClick={() => handleSuggestionClick(product)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
            >
              <img src={product.image} alt="" className="w-8 h-8 object-contain" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-800 truncate">{product.title}</div>
                <div className="text-xs text-gray-500">{product.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
