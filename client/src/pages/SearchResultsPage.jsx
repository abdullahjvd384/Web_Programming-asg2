import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../store/slices/productSlice'
import ProductCard from '../components/Product/ProductCard'

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const dispatch = useDispatch()
  const { searchResults, loading } = useSelector(state => state.products)

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProducts(query))
    }
  }, [dispatch, query])

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="bg-white px-4 py-2 mb-4 rounded-sm border-b border-gray-200">
        <h1 className="text-lg">
          {loading ? 'Searching...' : (
            <>
              <span className="font-bold text-[#C7511F]">{searchResults.length}</span>
              {' '}results for "<span className="text-[#C7511F] font-bold">{query}</span>"
            </>
          )}
        </h1>
      </div>

      {!loading && searchResults.length === 0 && query && (
        <div className="bg-white p-8 text-center rounded-sm">
          <h2 className="text-xl font-bold text-[#0F1111] mb-2">No results found</h2>
          <p className="text-gray-600">Try checking your spelling or use more general terms.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {searchResults.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default SearchResultsPage
