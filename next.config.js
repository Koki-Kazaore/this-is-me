/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add other Next.js settings here
    reactStrictMode: true,
}

const { withAxiom } = require('next-axiom');

module.exports = withAxiom(nextConfig);
