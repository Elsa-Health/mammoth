/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")([
	// packages on the dev environment
]);

module.exports = withTM(nextConfig);
