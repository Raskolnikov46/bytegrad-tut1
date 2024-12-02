import type { Metadata } from 'next';
import { Inter, Righteous } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './providers';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter'
});

const righteous = Righteous({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-righteous'
});

export const metadata: Metadata = {
	title: {
		default: 'Bytegrad Blog',
		template: '%s | Bytegrad Blog'
	},
	description: 'Generated by create next app',
	metadataBase: new URL('https://your-website.com'),
	openGraph: {
		title: 'Bytegrad Blog',
		description: 'Generated by create next app',
		url: 'https://your-website.com',
		siteName: 'Bytegrad Blog',
		images: [
			{
				url: '/logo.png',
				width: 800,
				height: 600,
				alt: 'Bytegrad Blog Logo'
			}
		],
		locale: 'en_US',
		type: 'website'
	},
	icons: {
		icon: '/bytegrad.svg',
		apple: '/apple-icon.png'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${righteous.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
			>
				<Providers>
					<Navbar />
					<main className="flex-grow">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
