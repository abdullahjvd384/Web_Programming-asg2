import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAPI, addToCartLocal } from '../../store/slices/cartSlice'
import { formatPrice } from '../../utils/validation'
import RatingStars from './RatingStars'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (token) {
      dispatch(addToCartAPI({ productId: product._id, quantity: 1 }))
    } else {
      dispatch(addToCartLocal({ product, quantity: 1 }))
    }
  }

  return (
    <div className="bg-white rounded-sm p-4 hover:shadow-md transition-shadow flex flex-col h-full">
      <Link to={`/products/${product._id}`} className="flex-1">
        <div className="flex justify-center mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-48 object-contain"
          />
        </div>
        <h3 className="text-sm text-[#0F1111] hover:text-[#C7511F] line-clamp-2 mb-1">
          {product.title}
        </h3>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1">
          <span className="text-xl font-medium text-[#0F1111]">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span></span>
              <span className="text-xs text-[#CC0C39]">({product.discount}% off)</span>
            </div>
          )}
        </div>
        {product.isPrime && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-bold text-[#007185] bg-[#F0F2F2] px-1.5 py-0.5 rounded">Prime</span>
            <span className="text-xs text-gray-500">FREE Delivery</span>
          </div>
        )}
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-medium py-1.5 rounded-full border border-[#FCD200] transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
