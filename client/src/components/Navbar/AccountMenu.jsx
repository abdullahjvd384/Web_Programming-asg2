import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { clearCartLocal } from '../../store/slices/cartSlice'

const AccountMenu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCartLocal())
  }

  return (
    <div className="relative group text-white px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
      <div className="text-[11px] text-gray-300">
        Hello, {user ? user.name.split(' ')[0] : 'Sign in'}
      </div>
      <div className="text-sm font-bold">Account & Lists</div>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 hidden group-hover:block z-50">
        {user ? (
          <div className="py-2">
            <div className="px-4 py-2 text-gray-800 font-semibold border-b">
              Hi, {user.name}
            </div>
            <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Orders
            </Link>
            <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="py-3 px-4">
            <Link
              to="/signin"
              className="block w-full text-center bg-[#FFD814] hover:bg-[#F7CA00] text-sm py-2 rounded-lg font-medium mb-2"
            >
              Sign in
            </Link>
            <div className="text-xs text-gray-600">
              New customer? <Link to="/signup" className="text-[#007185] hover:text-[#C7511F] hover:underline">Start here.</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountMenu
