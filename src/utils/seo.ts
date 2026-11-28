import type { Metadata } from 'next';
import { baseURL } from '@/resources';

export function getCanonicalUrl(pathname: string): string {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return new URL(normalizedPath, baseURL).toString();
}

export function withCanonical(
  metadata: Metadata,
  pathname: string
): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: getCanonicalUrl(pathname),
    },
  };
}
