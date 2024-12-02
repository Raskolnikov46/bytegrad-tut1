'use client';

export default function Error({
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
				<p className="text-gray-600 text-lg mb-8">
					We couldn&apos;t load the post you&apos;re looking for.
				</p>
				<div className="space-x-4">
					<button
						onClick={() => reset()}
						className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						Try Again
					</button>
					<button
						onClick={() => window.history.back()}
						className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						Go Back
					</button>
				</div>
			</div>
		</main>
	);
}
