import CategoryCard from './CategoryCard'

const categories = ['Electronics', 'Mobile Phones', 'Fashion', 'Home & Kitchen', 'Books', 'Appliances']

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-16 relative z-10 max-w-[1500px] mx-auto">
      {categories.map(cat => (
        <CategoryCard key={cat} category={cat} />
      ))}
    </div>
  )
}

export default CategoryGrid
