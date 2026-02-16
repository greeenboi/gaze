import { Feed } from 'feed';
import { getPosts } from '@/app/utils/utils';
import { baseURL } from '@/app/resources';
import { routing } from '@/i18n/routing';

export async function GET() {
  const locales = routing.locales;
  const includeLocalePrefix = locales.length > 1;
  const defaultLocale = routing.defaultLocale;
  
  // Ensure baseURL has the proper format
  const siteUrl = baseURL?.startsWith('http') 
    ? baseURL 
    : `https://${baseURL}`;

  // Create Feed instance
  const feed = new Feed({
    title: "Suvan GS's Blog",
    description: 'Writing about Tech, Games and Novels',
    id: siteUrl,
    link: siteUrl,
    language: defaultLocale,
    image: `${siteUrl}/images/avatar.jpeg`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Suvan GS`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: 'Suvan GS',
      email: 'suvan.gowrishanker.204@gmail.com',
      link: siteUrl,
    },
  });

  // Get all blog posts from all locales
  const allPosts = locales.flatMap(locale => {
    const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    return posts.map(post => ({ ...post, locale }));
  });

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  // Add each post to the feed
  for (const post of sortedPosts) {
    const postUrl = `${siteUrl}${includeLocalePrefix ? `/${post.locale}` : ''}/blog/${post.slug}`;
    
    feed.addItem({
      title: post.metadata.title,
      image: post.metadata.image ? `${siteUrl}${post.metadata.image}` : undefined,
      id: postUrl,
      link: postUrl,
      description: post.metadata.summary || '',
      content: post.metadata.summary || '',
      author: [
        {
          name: 'Suvan GS',
          email: 'suvan.gowrishanker.204@gmail.com',
          link: siteUrl,
        },
      ],
      date: new Date(post.metadata.publishedAt),
      category: post.metadata.tag ? [{ name: post.metadata.tag }] : [],
      ...(post.metadata.image && {
        image: `${siteUrl}${post.metadata.image}`,
      }),
    });
  }

  // Return the RSS feed as XML
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
