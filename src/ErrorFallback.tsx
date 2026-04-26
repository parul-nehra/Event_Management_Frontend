export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAE1DD] to-[#FEC5BB]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#FEC5BB] text-gray-900 rounded-lg hover:bg-[#FCD5CE] transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
