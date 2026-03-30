import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ProductCard from '../Product/ProductCard'

const ProductRow = ({ title, products }) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      })
    }
  }

  if (!products || products.length === 0) return null

  return (
    <div className="bg-white px-4 py-4 my-4 max-w-[1500px] mx-auto">
      <h2 className="text-xl font-bold text-[#0F1111] mb-3">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FiChevronLeft size={24} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-thin pb-2 px-8"
          style={{ scrollbarWidth: 'thin' }}
        >
          {products.map(product => (
            <div key={product._id} className="flex-shrink-0 w-[220px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default ProductRow
