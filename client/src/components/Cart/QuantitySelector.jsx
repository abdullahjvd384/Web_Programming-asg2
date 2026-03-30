const QuantitySelector = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center border border-[#D5D9D9] rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => onChange(quantity - 1)}
        className="px-3 py-1 bg-[#F0F2F2] hover:bg-[#E3E6E6] text-lg font-medium border-r border-[#D5D9D9]"
      >
        -
      </button>
      <span className="px-4 py-1 text-sm font-medium bg-white min-w-[40px] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="px-3 py-1 bg-[#F0F2F2] hover:bg-[#E3E6E6] text-lg font-medium border-l border-[#D5D9D9]"
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
