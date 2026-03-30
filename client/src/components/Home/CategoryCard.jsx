import { Link } from 'react-router-dom'

const categoryImages = {
  'Electronics': 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/TS/D37847648_Accessories_702x300-PC._CB582727868_.jpg',
  'Mobile Phones': 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/budgetphones/702x300_bugdet._CB601548407_.jpg',
  'Fashion': 'https://images-eu.ssl-images-amazon.com/images/G/31/img2021/V0/D27/Header_702x300._CB569356516_.jpg',
  'Home & Kitchen': 'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_702x300_2._CB582457107_.jpg',
  'Books': 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Books/BB/LandingPage/Hero_702x300._CB582101489_.jpg',
  'Appliances': 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/HnK/GW/PC/186x116_1._CB594251498_.jpg'
}

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${encodeURIComponent(category)}`} className="block bg-white p-5 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-[#0F1111] mb-3">{category}</h3>
      <div className="h-40 overflow-hidden rounded">
        <img
          src={categoryImages[category] || `https://via.placeholder.com/300x200?text=${encodeURIComponent(category)}`}
          alt={category}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-[#007185] text-sm mt-3 hover:text-[#C7511F] hover:underline">See more</p>
    </Link>
  )
}

export default CategoryCard
