/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")([
	"react-use",
	"@elsa-health/emr",
]);
module.exports = withTM(nextConfig);
