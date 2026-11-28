import { about, baseURL, blog, home, person, social, work } from '@/resources';
import { getCanonicalUrl } from './seo';

const personId = `${baseURL}/#person`;
const websiteId = `${baseURL}/#website`;

export function getPersonEntity() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: person.name,
    givenName: person.firstName,
    familyName: person.lastName,
    alternateName: ['Suvan GS', 'greeenboi', 'GreenArcade'],
    url: baseURL,
    image: new URL(person.avatar, baseURL).toString(),
    jobTitle: person.role,
    worksFor: {
      '@type': 'Organization',
      name: person.company,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'SRM Institute of Science and Technology',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'DevSecOps',
      'Software Engineering',
      'Distributed Systems',
      'CRDT Databases',
      'Rust',
      'TypeScript',
      'React',
      'Next.js',
      'Tauri',
      'Ruby on Rails',
      'Docker',
      'Kubernetes',
      'Proxmox VE',
      'Linux System Administration (RHCSA)',
      'AI Agents',
    ],
    sameAs: [
      ...social
        .filter(item => item.link.startsWith('https://'))
        .map(item => item.link),
      'https://peerlist.io/greeenboi',
    ],
  };
}

export function getProfileSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: baseURL,
        name: `${person.name} — Portfolio`,
        description: home.description,
        publisher: { '@id': personId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseURL}/#profile`,
        url: baseURL,
        name: home.title,
        description: home.description,
        isPartOf: { '@id': websiteId },
        mainEntity: getPersonEntity(),
      },
    ],
  };
}

export function getAboutPageSchema() {
  const canonical = getCanonicalUrl(about.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${canonical}#profilepage`,
        url: canonical,
        name: about.title,
        description: about.description,
        isPartOf: { '@id': websiteId },
        mainEntity: getPersonEntity(),
      },
      getBreadcrumbSchema([
        { name: 'Home', pathname: '/' },
        { name: 'About', pathname: about.path },
      ]),
    ],
  };
}

export function getBlogCollectionSchema(
  posts: Array<{
    slug: string;
    metadata: {
      title: string;
      summary: string;
      publishedAt: string;
      image?: string;
    };
  }>
) {
  const canonical = getCanonicalUrl(blog.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#collection`,
        url: canonical,
        name: blog.title,
        description: blog.description,
        isPartOf: { '@id': websiteId },
        author: { '@id': personId },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.map((post, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: getCanonicalUrl(`${blog.path}/${post.slug}`),
            name: post.metadata.title,
          })),
        },
      },
      getBreadcrumbSchema([
        { name: 'Home', pathname: '/' },
        { name: 'Blog', pathname: blog.path },
      ]),
    ],
  };
}

export function getWorkCollectionSchema(
  projects: Array<{
    slug: string;
    metadata: {
      title: string;
      summary: string;
      publishedAt: string;
      images?: string[];
    };
  }>
) {
  const canonical = getCanonicalUrl(work.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#collection`,
        url: canonical,
        name: work.title,
        description: work.description,
        isPartOf: { '@id': websiteId },
        author: { '@id': personId },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((project, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: getCanonicalUrl(`${work.path}/${project.slug}`),
            name: project.metadata.title,
          })),
        },
      },
      getBreadcrumbSchema([
        { name: 'Home', pathname: '/' },
        { name: 'Work & Projects', pathname: work.path },
      ]),
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
  readingTime?: number;
}) {
  const canonical = getCanonicalUrl(post.pathname);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['BlogPosting', 'TechArticle'],
        '@id': `${canonical}#article`,
        headline: post.title,
        description: post.description,
        url: canonical,
        datePublished: post.datePublished,
        dateModified: post.datePublished,
        author: { '@id': personId },
        publisher: { '@id': personId },
        isPartOf: { '@id': websiteId },
        inLanguage: 'en-US',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
        ...(post.readingTime ? { timeRequired: `PT${post.readingTime}M` } : {}),
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
        '@type': ['SoftwareSourceCode', 'SoftwareApplication'],
        '@id': `${canonical}#software`,
        name: project.name,
        headline: project.name,
        description: project.description,
        url: canonical,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        author: { '@id': personId },
        creator: { '@id': personId },
        isPartOf: { '@id': websiteId },
        inLanguage: 'en-US',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
        ...(project.tags?.length
          ? {
              programmingLanguage: project.tags,
              keywords: project.tags.join(', '),
            }
          : {}),
        ...(project.datePublished
          ? {
              dateCreated: project.datePublished,
              datePublished: project.datePublished,
            }
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

export function getBreadcrumbSchema(
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
