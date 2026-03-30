import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

const EmptyCart = () => {
  return (
    <div className="bg-white p-8 flex flex-col md:flex-row items-center gap-6">
      <FiShoppingCart size={80} className="text-gray-300" />
      <div>
        <h2 className="text-2xl font-bold text-[#0F1111] mb-2">Your Amazon Cart is empty</h2>
        <p className="text-sm text-gray-600 mb-4">
          Check your saved items or continue shopping.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-lg text-sm font-medium border border-[#FCD200]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
