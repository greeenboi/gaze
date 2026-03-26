import { Feed } from 'feed';
import { baseURL } from '@/resources';
import { getPosts } from '@/utils/utils';

export async function GET() {
  // Ensure baseURL has the proper format
  const siteUrl = baseURL?.startsWith('http') ? baseURL : `https://${baseURL}`;

  // Create Feed instance
  const feed = new Feed({
    title: "Suvan GS's Blog",
    description: 'Writing about Tech, Games and Novels',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
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

  const posts = getPosts(['src', 'app', 'blog', 'posts']).sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  // Add each post to the feed
  for (const post of posts) {
    const postUrl = `${siteUrl}/blog/${post.slug}`;

    feed.addItem({
      title: post.metadata.title,
      image: post.metadata.image
        ? `${siteUrl}${post.metadata.image}`
        : undefined,
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

  // Return the JSON feed
  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
