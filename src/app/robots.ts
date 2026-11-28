import type { MetadataRoute } from 'next';
import { baseURL } from '@/resources';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/'],
        disallow: ['/api/authenticate', '/api/check-auth', '/api/newsletter/'],
      },
    ],
    host: baseURL,
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
