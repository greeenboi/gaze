import { Flex, Heading, Button, Icon } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }) {
  const t = await getTranslations();
  const { blog } = renderContent(t);

  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      types: {
        'application/rss+xml': `${baseURL}/feed.xml`,
        'application/atom+xml': `${baseURL}/atom.xml`,
        'application/json': `${baseURL}/feed.json`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({
  params: { locale },
}: { params: { locale: string } }) {
  setRequestLocale(locale);

  const t = useTranslations();
  const { person, blog, newsletter } = renderContent(t);
  return (
    <Flex fillWidth maxWidth="s" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Flex fillWidth marginBottom="m" gap="s" alignItems="center" wrap>
        <Link href="/feed.xml" target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            size="s"
            prefixIcon="rss"
          >
            RSS
          </Button>
        </Link>
        <Link href="/atom.xml" target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            size="s"
            prefixIcon="rss"
          >
            Atom
          </Button>
        </Link>
        <Link href="/feed.json" target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            size="s"
            prefixIcon="rss"
          >
            JSON
          </Button>
        </Link>
        <Link 
          href={`https://validator.w3.org/feed/check.cgi?url=${encodeURIComponent(`https://${baseURL}/feed.xml`)}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src="/images/rss.png"
            alt="Valid RSS"
            title="Validate my RSS feed"
            width={88}
            height={31}
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </Flex>
      <Flex fillWidth flex={1} direction="column">
        <Posts range={[1, 3]} locale={locale} thumbnail />
        <Posts range={[4]} columns="2" locale={locale} />
      </Flex>
      {/* {newsletter.display && <Mailchimp newsletter={newsletter} />} */}
    </Flex>
  );
}
