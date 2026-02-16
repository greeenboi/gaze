import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'img.shields.io', pathname: '/work/*' }],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true, // Disable linting during next build
  },
};

export default withNextIntl(withMDX(nextConfig));
