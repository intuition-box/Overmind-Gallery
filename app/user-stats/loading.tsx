export default function Loading() {
  return (
    <div className="min-h-screen bg-background smoky-gradient flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading your stats...</p>
      </div>
    </div>
  )
}
