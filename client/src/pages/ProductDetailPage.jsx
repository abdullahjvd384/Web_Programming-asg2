import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../store/slices/productSlice'
import { addToCartAPI, addToCartLocal } from '../store/slices/cartSlice'
import { formatPrice } from '../utils/validation'
import RatingStars from '../components/Product/RatingStars'

const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentProduct: product, loading } = useSelector(state => state.products)
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCartAPI({ productId: product._id, quantity: 1 }))
    } else {
      dispatch(addToCartLocal({ product, quantity: 1 }))
    }
  }

  if (loading || !product) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="bg-white p-6 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-2/5 flex justify-center items-start">
          <img src={product.image} alt={product.title} className="max-h-[400px] object-contain" />
        </div>

        {/* Details */}
        <div className="md:w-2/5">
          <h1 className="text-2xl text-[#0F1111] mb-2">{product.title}</h1>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          <hr className="my-3" />
          <div className="mb-2">
            <span className="text-xs text-gray-600">Deal Price: </span>
            <span className="text-[28px] text-[#B12704]">{formatPrice(product.price)}</span>
          </div>
          {product.originalPrice > product.price && (
            <div className="text-sm text-gray-500 mb-1">
              M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-[#CC0C39] ml-2">Save {formatPrice(product.originalPrice - product.price)} ({product.discount}%)</span>
            </div>
          )}
          <div className="text-xs text-gray-500 mb-3">Inclusive of all taxes</div>
          {product.isPrime && (
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xs font-bold text-[#007185] bg-[#F0F2F2] px-2 py-1 rounded">Prime</span>
              <span className="text-sm text-gray-600">FREE Delivery</span>
            </div>
          )}
          <hr className="my-3" />
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Buy Box */}
        <div className="md:w-1/5">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-[28px] text-[#0F1111] mb-2">{formatPrice(product.price)}</div>
            <div className="text-sm text-gray-600 mb-1">FREE delivery</div>
            {product.inStock ? (
              <div className="text-lg text-green-700 mb-4">In Stock</div>
            ) : (
              <div className="text-lg text-red-600 mb-4">Out of Stock</div>
            )}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-full text-sm font-medium border border-[#FCD200] mb-2"
            >
              Add to Cart
            </button>
            <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] py-2 rounded-full text-sm font-medium border border-[#FF8F00]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
