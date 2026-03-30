import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productSlice'
import HeroCarousel from '../components/Home/HeroCarousel'
import CategoryGrid from '../components/Home/CategoryGrid'
import ProductRow from '../components/Home/ProductRow'

const HomePage = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const bestSellers = items.filter(p => p.rating >= 4.3)
  const todaysDeals = items.filter(p => p.discount >= 30)
  const electronics = items.filter(p => p.category === 'Electronics')
  const phones = items.filter(p => p.category === 'Mobile Phones')

  return (
    <div>
      <HeroCarousel />
      <CategoryGrid />
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading products...</div>
        ) : (
          <>
            <ProductRow title="Best Sellers" products={bestSellers} />
            <ProductRow title="Today's Deals" products={todaysDeals} />
            <ProductRow title="Top in Electronics" products={electronics} />
            <ProductRow title="Mobile Phones" products={phones} />
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
