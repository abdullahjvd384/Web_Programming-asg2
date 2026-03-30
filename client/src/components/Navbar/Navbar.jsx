import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LocationPicker from './LocationPicker'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import AccountMenu from './AccountMenu'

const categories = [
  'All', 'Best Sellers', "Today's Deals", 'Mobile Phones', 'Electronics',
  'Fashion', 'Home & Kitchen', 'Books', 'Appliances', 'Prime'
]

const Navbar = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <header className="sticky top-0 z-50">
      {/* Main Nav */}
      <div className="bg-[#131921] flex items-center px-2 py-1.5 gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded min-w-[120px]">
          <span className="text-white text-xl font-bold tracking-tight">
            amazon<span className="text-[#febd69]">.in</span>
          </span>
        </Link>

        {/* Location */}
        <LocationPicker />

        {/* Search */}
        <SearchBar />

        {/* Account */}
        <AccountMenu user={user} />

        {/* Returns & Orders */}
        <Link to="/products" className="text-white px-2 py-1 border border-transparent hover:border-white rounded hidden md:block">
          <div className="text-[11px] text-gray-300">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        {/* Cart */}
        <CartIcon />
      </div>

      {/* Sub Nav */}
      <div className="bg-[#232f3e] flex items-center px-4 py-1 gap-1 overflow-x-auto">
        {categories.map(cat => (
          <Link
            key={cat}
            to={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
            className="text-white text-sm px-2 py-1 whitespace-nowrap border border-transparent hover:border-white rounded"
          >
            {cat}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Navbar
