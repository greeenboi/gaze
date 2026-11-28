import type { Metadata } from 'next';
import { baseURL, person } from '@/resources';

export function getCanonicalUrl(pathname: string): string {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return new URL(normalizedPath, baseURL).toString();
}

export function withCanonical(
  metadata: Metadata,
  pathname: string,
  keywords?: string[]
): Metadata {
  const canonical = getCanonicalUrl(pathname);
  return {
    ...metadata,
    ...(keywords?.length
      ? {
          keywords: Array.from(
            new Set([
              person.name,
              'Suvan GS',
              'greeenboi',
              person.role,
              ...keywords,
            ])
          ),
        }
      : {}),
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    openGraph: {
      ...metadata.openGraph,
      url: canonical,
      siteName: `${person.name} — Portfolio`,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@greeenboi',
      ...metadata.twitter,
    },
  };
}
