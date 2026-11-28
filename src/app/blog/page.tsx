import { Column, Heading, Meta } from '@once-ui-system/core';
import { NewsletterSignup } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { JsonLd } from '@/components/JsonLd';
import { baseURL, blog } from '@/resources';
import { getBlogCollectionSchema } from '@/utils/schema';
import { withCanonical } from '@/utils/seo';
import { getPosts } from '@/utils/utils';

export async function generateMetadata() {
  return withCanonical(
    Meta.generate({
      title: blog.title,
      description: blog.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: blog.path,
    }),
    blog.path,
    ['Engineering Blog', 'DevSecOps', 'Homelab', 'Linux', 'CRDT', 'Carnelia']
  );
}

export default function Blog() {
  const posts = getPosts(['src', 'app', 'blog', 'posts']).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <JsonLd data={getBlogCollectionSchema(posts)} />
      <Heading
        as="h1"
        marginBottom="l"
        variant="heading-strong-xl"
        marginLeft="24"
      >
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <NewsletterSignup marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
