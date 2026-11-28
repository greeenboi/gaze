import type { MetadataRoute } from 'next';
import { baseURL, routes as routesConfig } from '@/resources';
import { getPosts } from '@/utils/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = getPosts(['src', 'app', 'blog', 'posts']).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const workProjects = getPosts(['src', 'app', 'work', 'projects']).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const latestBlogDate = blogPosts[0]?.metadata.publishedAt
    ? new Date(blogPosts[0].metadata.publishedAt)
    : new Date();
  const latestWorkDate = workProjects[0]?.metadata.publishedAt
    ? new Date(workProjects[0].metadata.publishedAt)
    : new Date();
  const latestSiteDate =
    latestBlogDate > latestWorkDate ? latestBlogDate : latestWorkDate;

  const blogs: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const works: MetadataRoute.Sitemap = workProjects.map(post => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const routePriorities: Record<string, number> = {
    '/': 1.0,
    '/work': 0.9,
    '/blog': 0.9,
    '/about': 0.8,
    '/gallery': 0.6,
  };

  const activeRoutes = Object.keys(routesConfig).filter(
    route => routesConfig[route as keyof typeof routesConfig]
  );

  const routes: MetadataRoute.Sitemap = activeRoutes.map(route => ({
    url: `${baseURL}${route !== '/' ? route : ''}`,
    lastModified:
      route === '/blog'
        ? latestBlogDate
        : route === '/work'
          ? latestWorkDate
          : latestSiteDate,
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: routePriorities[route] ?? 0.7,
  }));

  return [...routes, ...blogs, ...works];
}
