import PostSkeleton from '@/app/components/PostSkeleton';

export default function Loading() {
	return (
		<div className="max-w-3xl mx-auto pt-16 px-4">
			<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-8" />
			<PostSkeleton />
		</div>
	);
}
