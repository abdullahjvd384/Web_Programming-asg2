import { FiMapPin } from 'react-icons/fi'

const LocationPicker = () => {
  return (
    <div className="hidden md:flex items-center text-white px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
      <FiMapPin className="text-white mr-1" size={18} />
      <div>
        <div className="text-[11px] text-gray-300">Deliver to</div>
        <div className="text-sm font-bold">Mumbai 400001</div>
      </div>
    </div>
  )
}

export default LocationPicker
