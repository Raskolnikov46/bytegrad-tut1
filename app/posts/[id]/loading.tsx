export default function Loading() {
	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto pt-16">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
					<div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
					<div className="space-y-3">
						<div className="h-4 bg-gray-200 rounded w-full"></div>
						<div className="h-4 bg-gray-200 rounded w-full"></div>
						<div className="h-4 bg-gray-200 rounded w-2/3"></div>
					</div>
				</div>
			</div>
		</main>
	);
}
