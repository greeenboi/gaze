import {
  AvatarGroup,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  SmartLink,
  Text,
} from '@once-ui-system/core';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX, ScrollToHash } from '@/components';
import { JsonLd } from '@/components/JsonLd';
import { Projects } from '@/components/work/Projects';
import { about, baseURL, person, work } from '@/resources';
import { formatDate } from '@/utils/formatDate';
import { getProjectSchema } from '@/utils/schema';
import { withCanonical } from '@/utils/seo';
import { getPosts } from '@/utils/utils';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(['src', 'app', 'work', 'projects']);
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

  const posts = getPosts(['src', 'app', 'work', 'projects']);
  const post = posts.find(post => post.slug === slugPath);

  if (!post) return {};

  const pathname = `${work.path}/${post.slug}`;
  return withCanonical(
    Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary,
      baseURL,
      image:
        post.metadata.images[0] ||
        `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
      path: pathname,
      author: { name: person.name, url: `${baseURL}${about.path}` },
    }),
    pathname,
    post.metadata.tags
  );
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join('/')
    : routeParams.slug || '';

  const post = getPosts(['src', 'app', 'work', 'projects']).find(
    post => post.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map(person => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <JsonLd
        data={getProjectSchema({
          name: post.metadata.title,
          description: post.metadata.summary,
          pathname: `${work.path}/${post.slug}`,
          image: post.metadata.images[0],
          repoUrl: post.metadata.link,
          tags: post.metadata.tags,
          datePublished: post.metadata.publishedAt,
        })}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text
          variant="body-default-xs"
          onBackground="neutral-weak"
          marginBottom="12"
        >
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading as="h1" variant="display-strong-m">
          {post.metadata.title}
        </Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && (
            <AvatarGroup reverse avatars={avatars} size="s" />
          )}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{' '}
                  </Text>
                )}
                {member.linkedIn ? (
                  <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                ) : (
                  <Text as="span">{member.name}</Text>
                )}
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={post.metadata.title}
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: 'auto' }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Recent projects
        </Heading>
        <Projects exclude={[post.slug]} range={[1, 3]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
