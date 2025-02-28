/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['some-es6-package', 'another-module']);
const { withAxiom } = require('next-axiom');

const nextConfig = {
    // Add other Next.js settings here
    reactStrictMode: true,
    experimental: {
        forceSwcTransforms: true,
    },
};

module.exports = withTM(withAxiom(nextConfig));
