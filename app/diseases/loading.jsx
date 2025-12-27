export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-4">
      {/* Search bar skeleton */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
        </div>
      </div>

      {/* Disease cards skeleton */}
      <div className="flex-1 w-full max-w-6xl px-4">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="py-4">
        <div className="animate-pulse flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
