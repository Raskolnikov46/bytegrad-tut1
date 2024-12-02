import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tailwindui.com',
				pathname: '/plus/img/**'
			}
		]
	}
};

export default nextConfig;
