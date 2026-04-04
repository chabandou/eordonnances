export default function Loading() {
    return (
        <>
            <div className="background" style={{ width: '45%', right: '10%', backgroundColor: 'var(--shape-bg-1)', clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }}></div>
            <div className="background" style={{ width: '45%', right: '0%', backgroundColor: 'var(--shape-bg-2)', clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }}></div>
            <div className="relative flex flex-col w-full min-h-screen items-center justify-center gap-10 z-[5] p-4 lg:p-10">
                <div className="w-full max-w-2xl flex flex-col items-center gap-6 animate-pulse">
                    {/* Title Skeleton */}
                    <div className="h-10 lg:h-12 w-3/4 max-w-md bg-gray-200/50 dark:bg-gray-700/50 rounded-lg" />

                    {/* Form Card Skeleton */}
                    <div className="w-full min-h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col gap-6">
                        {/* Input groups */}
                        <div className="space-y-2">
                            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-12 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-12 w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
                        </div>

                        {/* Textarea */}
                        <div className="space-y-2 flex-1">
                            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-full min-h-[150px] w-full bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
                        </div>

                        {/* Button */}
                        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-4" />
                    </div>
                </div>
            </div>
        </>
    );
}
