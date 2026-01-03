/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add other Next.js settings here
  reactStrictMode: true,
  // Experimental options removed to avoid Turbopack warnings.
};

const { withAxiom } = require("next-axiom");

module.exports = withAxiom(nextConfig);
