import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productSlice'
import ProductCard from '../components/Product/ProductCard'
import ProductListItem from '../components/Product/ProductListItem'
import FilterSidebar from '../components/Product/FilterSidebar'
import ViewToggle from '../components/Product/ViewToggle'
import SortDropdown from '../components/Product/SortDropdown'

const ProductListingPage = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.products)
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('relevance')
  const [filters, setFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    priceRange: null,
    minRating: 0,
    primeOnly: false
  })

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, categories: [categoryFromUrl] }))
    }
  }, [categoryFromUrl])

  const filteredProducts = useMemo(() => {
    let result = [...items]

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }
    if (filters.priceRange) {
      result = result.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max)
    }
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating)
    }
    if (filters.primeOnly) {
      result = result.filter(p => p.isPrime)
    }

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'discount': result.sort((a, b) => b.discount - a.discount); break
      default: break
    }

    return result
  }, [items, filters, sort])

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="flex gap-4">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 hidden md:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 bg-white px-4 py-2 rounded-sm border-b border-gray-200">
            <div className="text-sm text-gray-700">
              <span className="font-bold text-[#C7511F]">{filteredProducts.length}</span> results
              {categoryFromUrl && <span> for "{categoryFromUrl}"</span>}
            </div>
            <div className="flex items-center gap-4">
              <SortDropdown sort={sort} setSort={setSort} />
              <ViewToggle view={view} setView={setView} />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-sm">
              <p className="text-lg text-gray-600">No products found matching your filters.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div>
              {filteredProducts.map(p => (
                <ProductListItem key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage
