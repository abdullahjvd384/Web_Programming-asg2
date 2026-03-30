import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAPI, addToCartLocal } from '../../store/slices/cartSlice'
import { formatPrice } from '../../utils/validation'
import RatingStars from './RatingStars'

const ProductListItem = ({ product }) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCartAPI({ productId: product._id, quantity: 1 }))
    } else {
      dispatch(addToCartLocal({ product, quantity: 1 }))
    }
  }

  return (
    <div className="bg-white p-4 flex gap-4 border-b border-gray-200">
      <Link to={`/products/${product._id}`} className="flex-shrink-0">
        <img src={product.image} alt={product.title} className="w-48 h-48 object-contain" />
      </Link>
      <div className="flex-1">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg text-[#0F1111] hover:text-[#C7511F] line-clamp-2 mb-1">{product.title}</h3>
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-2">
          <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="ml-2 text-sm text-gray-500">
              M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-[#CC0C39] ml-1">({product.discount}% off)</span>
            </span>
          )}
        </div>
        {product.isPrime && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-bold text-[#007185] bg-[#F0F2F2] px-1.5 py-0.5 rounded">Prime</span>
            <span className="text-xs text-gray-500">FREE Delivery by Tomorrow</span>
          </div>
        )}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-3 bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-medium px-6 py-1.5 rounded-full border border-[#FCD200]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductListItem
