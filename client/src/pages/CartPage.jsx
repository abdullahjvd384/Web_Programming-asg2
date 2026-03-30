import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, clearCartAPI, clearCartLocal } from '../store/slices/cartSlice'
import CartItem from '../components/Cart/CartItem'
import CartSummary from '../components/Cart/CartSummary'
import EmptyCart from '../components/Cart/EmptyCart'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice, loading } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(fetchCart())
    }
  }, [dispatch, token])

  const handleClearCart = () => {
    if (token) {
      dispatch(clearCartAPI())
    } else {
      dispatch(clearCartLocal())
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading cart...</div>
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart items */}
          <div className="flex-1">
            <div className="bg-white p-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-[28px] font-normal text-[#0F1111]">Shopping Cart</h1>
                <button
                  onClick={handleClearCart}
                  className="text-[#007185] text-sm hover:underline hover:text-[#C7511F]"
                >
                  Clear all items
                </button>
              </div>
              <div className="text-right text-sm text-gray-500 mb-2 px-4">Price</div>
              <hr />
              {items.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
              <div className="text-right py-4 text-lg">
                Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
                <span className="font-bold">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
