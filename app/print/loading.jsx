export default function Loading() {
    return (
        <section className="print-sec grid grid-cols-2 place-items-center min-h-screen p-4 animate-pulse">
            {/* Left side: Prescription Preview Skeleton */}
            <div className="prescription w-full max-w-lg h-[600px] bg-white border border-gray-200 shadow-lg rounded-xl p-10 flex flex-col gap-8 relative overflow-hidden">
                {/* Paper texture feel */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-300" />

                {/* Patient Info Block */}
                <div className="space-y-4 mt-8">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="h-8 w-64 bg-gray-300 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>

                {/* Rx Content Pattern */}
                <div className="space-y-6 mt-8 flex-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-2">
                            <div className="h-5 w-3/4 bg-gray-200 rounded" />
                            <div className="h-4 w-1/2 bg-gray-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side: Form Skeleton */}
            <div className="w-full max-w-sm flex flex-col gap-6">
                {/* Inputs */}
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-full h-12 bg-gray-200 rounded-lg" />
                ))}
                {/* Button */}
                <div className="w-full h-12 bg-gray-300 rounded-lg mt-4" />
            </div>
        </section>
    );
}
