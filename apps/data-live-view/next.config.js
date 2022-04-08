/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["sabertooth"]);

module.exports = withTM(nextConfig);
