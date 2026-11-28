import { baseURL, person, social } from '@/resources';
import { getCanonicalUrl } from './seo';

const personId = `${baseURL}/#person`;

export function getProfileSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseURL}/#website`,
        url: baseURL,
        name: `${person.name} — Portfolio`,
        inLanguage: 'en',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseURL}/#profile`,
        url: baseURL,
        name: `${person.name} — ${person.role}`,
        mainEntity: {
          '@type': 'Person',
          '@id': personId,
          name: person.name,
          alternateName: 'greeenboi',
          url: baseURL,
          image: new URL(person.avatar, baseURL).toString(),
          jobTitle: person.role,
          worksFor: {
            '@type': 'Organization',
            name: person.company,
          },
          sameAs: social
            .filter(item => item.link.startsWith('https://'))
            .map(item => item.link),
        },
      },
    ],
  };
}

export function getBlogPostSchema(post: {
  title: string;
  description: string;
  pathname: string;
  datePublished: string;
  image?: string;
  tags?: string[];
}) {
  const canonical = getCanonicalUrl(post.pathname);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: post.title,
        description: post.description,
        url: canonical,
        datePublished: post.datePublished,
        dateModified: post.datePublished,
        author: { '@id': personId },
        publisher: { '@id': personId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        ...(post.tags?.length ? { keywords: post.tags } : {}),
        ...(post.image
          ? { image: new URL(post.image, baseURL).toString() }
          : {}),
      },
      getBreadcrumbSchema([
        { name: 'Home', pathname: '/' },
        { name: 'Blog', pathname: '/blog' },
        { name: post.title, pathname: post.pathname },
      ]),
    ],
  };
}

export function getProjectSchema(project: {
  name: string;
  description: string;
  pathname: string;
  image?: string;
  repoUrl?: string;
  tags?: string[];
  datePublished?: string;
}) {
  const canonical = getCanonicalUrl(project.pathname);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${canonical}#software`,
        name: project.name,
        description: project.description,
        url: canonical,
        author: { '@id': personId },
        ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
        ...(project.tags?.length
          ? { programmingLanguage: project.tags }
          : {}),
        ...(project.datePublished
          ? { dateCreated: project.datePublished }
          : {}),
        ...(project.image
          ? { image: new URL(project.image, baseURL).toString() }
          : {}),
      },
      getBreadcrumbSchema([
        { name: 'Home', pathname: '/' },
        { name: 'Projects', pathname: '/work' },
        { name: project.name, pathname: project.pathname },
      ]),
    ],
  };
}

function getBreadcrumbSchema(
  items: Array<{ name: string; pathname: string }>
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.pathname),
    })),
  };
}
