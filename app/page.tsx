import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function Home() {
	const recentPosts = await prisma.post.findMany({
		take: 3,
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<main>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
					<div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						<div className="lg:col-span-7">
							<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
								Welcome to <span className="block text-blue-200">Your Awesome Blog</span>
							</h1>
							<p className="mt-6 text-xl text-blue-100">
								Discover interesting stories, insights, and ideas. Join our community of readers and
								writers.
							</p>
							<div className="mt-10 flex gap-4">
								<Link
									href="/posts"
									className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
								>
									Read Posts
								</Link>
								<Link
									href="/posts/new"
									className="rounded-md bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-400"
								>
									Start Writing
								</Link>
							</div>
						</div>
						<div className="hidden lg:block lg:col-span-5 lg:relative">
							<div className="absolute right-0 top-1/2 -translate-y-1/2">
								<svg className="w-96 h-96 text-blue-300/20" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-.553 0-1 .448-1 1v5H6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1V6c0-.552-.447-1-1-1z" />
								</svg>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="space-y-4 text-center">
										<div className="text-6xl font-bold text-white">{recentPosts.length}</div>
										<div className="text-xl font-medium text-blue-200">Posts Published</div>
									</div>
								</div>
							</div>
							<div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-12 opacity-20">
								<svg
									className="w-[500px] h-[500px]"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 4H4v4h4V4zm2 0h4v4h-4V4zm6 0h4v4h-4V4zM8 10H4v4h4v-4zm2 0h4v4h-4v-4zm6 0h4v4h-4v-4zM8 16H4v4h4v-4zm2 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
										fill="currentColor"
										className="text-blue-200"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Posts Section */}
			<section className="py-24 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							Latest Posts
						</h2>
						<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
							Check out our most recent publications
						</p>
					</div>

					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{recentPosts.map((post) => (
							<article
								key={post.id}
								className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800"
							>
								<div className="flex-1 p-6">
									<div className="flex-1">
										<Link href={`/posts/${post.id}`} className="block mt-2">
											<p className="text-xl font-semibold text-gray-900 dark:text-white">
												{post.title}
											</p>
											<p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
												{post.content}
											</p>
										</Link>
									</div>
									<div className="mt-6 flex items-center">
										<div className="flex-shrink-0">
											<span className="sr-only">{post.author}</span>
											<div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
												{post.author[0].toUpperCase()}
											</div>
										</div>
										<div className="ml-3">
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{post.author}
											</p>
											<div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
												<time dateTime={post.createdAt.toISOString()}>
													{post.createdAt.toLocaleDateString()}
												</time>
											</div>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className="mt-12 text-center">
						<Link
							href="/posts"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
						>
							View All Posts
							<svg
								className="ml-2 -mr-1 w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							Why Write With Us?
						</h2>
						<p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
							Share your thoughts with our growing community
						</p>
					</div>

					<div className="mt-16">
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{features.map((feature) => (
								<div key={feature.name} className="relative">
									<dt>
										<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
											{feature.icon}
										</div>
										<p className="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">
											{feature.name}
										</p>
									</dt>
									<dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
										{feature.description}
									</dd>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

const features = [
	{
		name: 'Easy to Use',
		description:
			'Our platform is designed to be intuitive and user-friendly. Start writing in minutes.',
		icon: (
			<svg
				className="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		)
	},
	{
		name: 'Beautiful Design',
		description:
			'Your content deserves to look great. We provide a clean, modern design that puts your writing first.',
		icon: (
			<svg
				className="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		)
	},
	{
		name: 'Global Reach',
		description:
			'Share your ideas with readers from around the world. Build your audience and grow your influence.',
		icon: (
			<svg
				className="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		)
	}
];
