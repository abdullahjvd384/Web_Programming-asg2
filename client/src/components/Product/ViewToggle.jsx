import { FiGrid, FiList } from 'react-icons/fi'

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => setView('grid')}
        className={`p-2 rounded ${view === 'grid' ? 'bg-[#007185] text-white' : 'bg-gray-200 text-gray-600'}`}
      >
        <FiGrid size={18} />
      </button>
      <button
        onClick={() => setView('list')}
        className={`p-2 rounded ${view === 'list' ? 'bg-[#007185] text-white' : 'bg-gray-200 text-gray-600'}`}
      >
        <FiList size={18} />
      </button>
    </div>
  )
}

export default ViewToggle
