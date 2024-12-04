export default function PostSkeleton() {
	return (
		<div className="border dark:border-gray-700 rounded-lg p-6 animate-pulse">
			<div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
			<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
			<div className="space-y-3">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
			</div>
		</div>
	);
}
