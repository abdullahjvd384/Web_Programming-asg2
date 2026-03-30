import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-[#37475a] text-white text-center py-3 cursor-pointer hover:bg-[#485769] text-sm"
      >
        Back to top
      </div>

      {/* Links */}
      <div className="bg-[#232f3e] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-3 text-base">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">About Us</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
              <li><Link to="/" className="hover:underline">Amazon Science</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Facebook</Link></li>
              <li><Link to="/" className="hover:underline">Twitter</Link></li>
              <li><Link to="/" className="hover:underline">Instagram</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Sell on Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Sell under Amazon Accelerator</Link></li>
              <li><Link to="/" className="hover:underline">Protect and Build Your Brand</Link></li>
              <li><Link to="/" className="hover:underline">Amazon Global Selling</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">COVID-19 and Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Your Account</Link></li>
              <li><Link to="/products" className="hover:underline">Returns Centre</Link></li>
              <li><Link to="/" className="hover:underline">100% Purchase Protection</Link></li>
              <li><Link to="/" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#131921] text-white text-center py-4 text-xs">
        <div className="mb-2">
          <span className="text-lg font-bold">amazon<span className="text-[#febd69]">.in</span></span>
        </div>
        <p className="text-gray-400">&copy; 2024 Amazon Clone. All rights reserved. Educational purpose only.</p>
      </div>
    </footer>
  )
}

export default Footer
