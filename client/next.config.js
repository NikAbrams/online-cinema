/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		API_URL: process.env.REACT_API_URL,
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.REACT_API_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.REACT_API_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
