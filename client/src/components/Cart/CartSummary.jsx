import { formatPrice } from '../../utils/validation'

const CartSummary = ({ totalQuantity, totalPrice }) => {
  return (
    <div className="bg-white p-5 rounded-sm border border-gray-200">
      <div className="flex items-center gap-1 text-green-700 text-sm mb-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Your order is eligible for FREE Delivery.
      </div>
      <div className="text-lg">
        Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
        <span className="font-bold">{formatPrice(totalPrice)}</span>
      </div>
      <button className="w-full mt-4 bg-[#FFD814] hover:bg-[#F7CA00] py-2 rounded-lg text-sm font-medium border border-[#FCD200]">
        Proceed to Buy
      </button>
    </div>
  )
}

export default CartSummary
