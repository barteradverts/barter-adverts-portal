export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="loading-shimmer w-32 h-8 rounded-lg mb-4 mx-auto"></div>
        <div className="loading-shimmer w-48 h-4 rounded mb-2 mx-auto"></div>
        <div className="loading-shimmer w-40 h-4 rounded mx-auto"></div>
      </div>
    </div>
  )
}
