export default function Loading() {
	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto pt-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-5 text-center animate-pulse bg-gray-200 h-12 w-48 mx-auto rounded"></h1>

				<div className="space-y-8 mb-16">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="border rounded-lg p-6">
							<div className="animate-pulse">
								<div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
