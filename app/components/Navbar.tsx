'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Posts', href: '/posts' }
];

const authenticatedNavigation = [...navigation, { name: 'Create Post', href: '/posts/new' }];

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const menuRef = useRef(null);
	const { userId } = useAuth();

	const currentNavigation = userId ? authenticatedNavigation : navigation;

	return (
		<Disclosure as="nav" className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-800">
			{({ open, close }) => (
				<>
					<div ref={menuRef} className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									<Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
									<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
								</DisclosureButton>
							</div>
							<div className="flex flex-1 items-center justify-center sm:justify-between">
								<div className="flex items-center">
									<Link href="/" onClick={() => router.refresh()}>
										<span className="text-2xl font-[var(--font-righteous)] text-gray-900 dark:text-white">
											JT Inc
										</span>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex items-center space-x-4">
										{currentNavigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => router.refresh()}
												aria-current={pathname === item.href ? 'page' : undefined}
												className={classNames(
													pathname === item.href
														? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
														: 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
											>
												{item.name}
											</Link>
										))}
										<ThemeToggle />
										<div className="flex items-center space-x-4">
											{!userId ? (
												<>
													<SignInButton mode="modal">
														<button className="text-gray-900 dark:text-gray-100 hover:text-gray-600">
															Sign in
														</button>
													</SignInButton>
													<SignUpButton mode="modal">
														<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
															Sign up
														</button>
													</SignUpButton>
												</>
											) : (
												<UserButton
													afterSignOutUrl="/"
													appearance={{
														elements: {
															avatarBox: 'w-10 h-10'
														}
													}}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<AnimatePresence>
						{open && (
							<div>
								<div
									className="fixed inset-0 bg-black/20 dark:bg-black/40"
									onClick={() => close()}
								/>
								<DisclosurePanel static className="sm:hidden relative bg-white dark:bg-gray-900">
									<motion.div
										initial={{ y: -50, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -50, opacity: 0 }}
										transition={{
											type: 'spring',
											stiffness: 200,
											damping: 25,
											mass: 1,
											duration: 0.3
										}}
										className="space-y-1 px-2 pb-3 pt-2"
									>
										{currentNavigation.map((item) => (
											<DisclosureButton
												key={item.name}
												as={Link}
												href={item.href}
												onClick={() => {
													router.refresh();
													close();
												}}
												aria-current={pathname === item.href ? 'page' : undefined}
												className={classNames(
													pathname === item.href
														? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
														: 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
													'block rounded-md px-3 py-2 text-base font-medium'
												)}
											>
												{item.name}
											</DisclosureButton>
										))}
										<div className="px-3 py-2">
											<ThemeToggle />
										</div>
										<div className="px-3 py-2">
											{!userId ? (
												<div className="space-y-2">
													<SignInButton mode="modal">
														<button className="text-gray-900 dark:text-gray-100 hover:text-gray-600 w-full text-left">
															Sign in
														</button>
													</SignInButton>
													<SignUpButton mode="modal">
														<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
															Sign up
														</button>
													</SignUpButton>
												</div>
											) : (
												<UserButton
													afterSignOutUrl="/"
													appearance={{
														elements: {
															avatarBox: 'w-10 h-10'
														}
													}}
												/>
											)}
										</div>
									</motion.div>
								</DisclosurePanel>
							</div>
						)}
					</AnimatePresence>
				</>
			)}
		</Disclosure>
	);
}
