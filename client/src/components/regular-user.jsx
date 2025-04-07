import { Users } from "lucide-react"

const RegularUserCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Icon */}
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="h-8 w-8 text-purple-600" />
        </div>

        {/* Number and Label */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">300</h2>
          <p className="text-purple-600 text-sm">Regular users</p>
        </div>

        {/* Date Selector */}
        <button className="flex items-center gap-1 px-3 py-1.5 border border-amber-400 rounded-md text-gray-500 text-xs">
          Jul 2022
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default RegularUserCard

