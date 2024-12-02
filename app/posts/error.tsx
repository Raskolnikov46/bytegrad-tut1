'use client';

export default function Error() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center">
			<div className="text-center px-4 lg:px-8">
				<div className="mb-8">
					<div className="mx-auto h-24 w-24 text-red-500">
						<svg
							className="h-full w-full"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
				</div>

				<h1 className="mt-2 text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">
					Error Loading Posts
				</h1>

				<p className="mt-4 text-lg text-gray-600">Something went wrong while fetching the posts.</p>

				<button
					onClick={() => window.location.reload()}
					className="mt-8 inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
				>
					Try Again
				</button>
			</div>
		</main>
	);
}
