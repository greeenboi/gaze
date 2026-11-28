import {
  Avatar,
  Column,
  Flex,
  Heading,
  HeadingNav,
  Line,
  Media,
  Meta,
  Row,
  SmartLink,
  Text,
  TiltFx,
} from '@once-ui-system/core';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX, ScrollToHash } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { ShareSection } from '@/components/blog/ShareSection';
import { JsonLd } from '@/components/JsonLd';
import { about, baseURL, blog, person } from '@/resources';
import { formatDate } from '@/utils/formatDate';
import { getBlogPostSchema } from '@/utils/schema';
import { withCanonical } from '@/utils/seo';
import { getPosts } from '@/utils/utils';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join('/')
    : routeParams.slug || '';

  const posts = getPosts(['src', 'app', 'blog', 'posts']);
  const post = posts.find(post => post.slug === slugPath);

  if (!post) return {};

  const pathname = `${blog.path}/${post.slug}`;
  return withCanonical(
    Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary,
      baseURL,
      image:
        post.metadata.image ||
        `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
      path: pathname,
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      author: { name: person.name, url: `${baseURL}${about.path}` },
    }),
    pathname,
    post.metadata.tags
  );
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join('/')
    : routeParams.slug || '';

  const post = getPosts(['src', 'app', 'blog', 'posts']).find(
    post => post.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column
          as="section"
          maxWidth="m"
          horizontal="center"
          gap="l"
          paddingTop="24"
        >
          <JsonLd
            data={getBlogPostSchema({
              title: post.metadata.title,
              description: post.metadata.summary,
              pathname: `${blog.path}/${post.slug}`,
              datePublished: post.metadata.publishedAt,
              image:
                post.metadata.image ||
                `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
              tags: post.metadata.tags,
              readingTime: post.metadata.readingTime,
            })}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">My Blog</Text>
            </SmartLink>
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
              marginBottom="12"
            >
              {post.metadata.publishedAt &&
                formatDate(post.metadata.publishedAt)}
            </Text>
            <Heading as="h1" variant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text
              as="h2"
              id="recent-posts"
              variant="heading-strong-xl"
              marginBottom="24"
            >
              Recent posts
            </Text>
            <Posts
              exclude={[post.slug]}
              range={[1, 2]}
              columns="2"
              thumbnail
              direction="column"
            />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
        <SmartLink href="https://docs.carnelia.dev" unstyled>
          <TiltFx intensity={4}>
            <Flex direction="column">
              <Media
                caption="I'm Building something cool!, Know more."
                aspectRatio="16/9"
                maxHeight={10}
                radius="l"
                src="/images/carnelia-og.png"
              />
            </Flex>
          </TiltFx>
        </SmartLink>
      </Column>
    </Row>
  );
}
