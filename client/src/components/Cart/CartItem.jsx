import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItemAPI, removeCartItemAPI, updateCartItemLocal, removeCartItemLocal } from '../../store/slices/cartSlice'
import { formatPrice } from '../../utils/validation'
import QuantitySelector from './QuantitySelector'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const product = item.productId

  if (!product) return null

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return
    if (token) {
      dispatch(updateCartItemAPI({ itemId: item._id, quantity: newQty }))
    } else {
      dispatch(updateCartItemLocal({ itemId: item._id, quantity: newQty }))
    }
  }

  const handleRemove = () => {
    if (token) {
      dispatch(removeCartItemAPI(item._id))
    } else {
      dispatch(removeCartItemLocal(item._id))
    }
  }

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 bg-white">
      <Link to={`/products/${product._id}`} className="flex-shrink-0">
        <img src={product.image} alt={product.title} className="w-44 h-44 object-contain" />
      </Link>
      <div className="flex-1">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg text-[#0F1111] hover:text-[#C7511F]">{product.title}</h3>
        </Link>
        {product.inStock ? (
          <span className="text-xs text-green-700">In Stock</span>
        ) : (
          <span className="text-xs text-red-600">Out of Stock</span>
        )}
        {product.isPrime && (
          <div className="mt-1">
            <span className="text-xs font-bold text-[#007185] bg-[#F0F2F2] px-1.5 py-0.5 rounded">Prime</span>
            <span className="text-xs text-gray-500 ml-1">FREE Delivery</span>
          </div>
        )}
        <div className="flex items-center gap-4 mt-3">
          <QuantitySelector quantity={item.quantity} onChange={handleQuantityChange} />
          <span className="text-gray-300">|</span>
          <button onClick={handleRemove} className="text-[#007185] text-sm hover:underline hover:text-[#C7511F]">
            Delete
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-lg font-bold text-[#0F1111]">{formatPrice(product.price * item.quantity)}</span>
        {item.quantity > 1 && (
          <div className="text-xs text-gray-500">{formatPrice(product.price)} each</div>
        )}
      </div>
    </div>
  )
}

export default CartItem
