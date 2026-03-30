import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'

const CartIcon = () => {
  const { totalQuantity } = useSelector(state => state.cart)

  return (
    <Link to="/cart" className="flex items-center text-white px-2 py-1 border border-transparent hover:border-white rounded relative">
      <div className="relative">
        <FiShoppingCart size={28} />
        <span className="absolute -top-2 -right-1 bg-[#f08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      </div>
      <span className="text-sm font-bold ml-1 hidden sm:block">Cart</span>
    </Link>
  )
}

export default CartIcon
