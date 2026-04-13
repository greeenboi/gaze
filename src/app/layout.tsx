import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';

import {
  AutoScroll,
  Background,
  Column,
  Fade,
  Flex,
  type opacity,
  RevealFx,
  type SpacingToken,
  Text,
} from '@once-ui-system/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Footer, Header, Providers } from '@/components';
import {
  baseURL,
  dataStyle,
  effects,
  fonts,
  home,
  person,
  style,
} from '@/resources';

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = `${person.firstName}'s Portfolio`;
  const siteDescription = 'Portfolio website showcasing my projects.';
  const linkPreviewSiteName = 'Link preview site name';
  const canonicalPath = home.path || '/';
  const absolutePageUrl = `${baseURL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const absoluteImageUrl = `${baseURL}${home.image}`;

  return {
    metadataBase: new URL(baseURL),
    title: {
      default: home.title,
      template: `%s | ${siteTitle}`,
    },
    description: home.description,
    applicationName: siteTitle,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: [
      person.name,
      person.role,
      person.firstName,
      'portfolio',
      'software engineer',
      'projects',
      'blog',
      'suvan',
      'agate',
      'carnelia',
      'Suvan',
      'Founders Club',      
    ],
    authors: [
      {
        name: person.name,
        url: baseURL,
      },
    ],
    creator: person.name,
    publisher: person.name,
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
      date:false,
      url: true
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-US': '/',
      },
      types: {
        'application/rss+xml': `${baseURL}/feed.xml`,
        'application/atom+xml': `${baseURL}/atom.xml`,
        'application/json': `${baseURL}/feed.json`,
      },
    },
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: 'Portfolio website showcasing my projects.',
      url: baseURL,
      siteName: linkPreviewSiteName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteImageUrl,
          alt: home.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      creator: '@greeenboi',
      images: [absoluteImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [{ url: '/favicon.ico' }],
      shortcut: [{ url: '/favicon.ico' }],
      apple: [{ url: '/favicon.ico' }],
    },
    appleWebApp: {
      capable: true,
      title: siteTitle,
      statusBarStyle: 'default',
    },
    appLinks: {
      web: {
        url: absolutePageUrl,
        should_fallback: true,
      },
    },
    archives: [`${baseURL}/blog`],
    assets: [`${baseURL}/images`],
    bookmarks: [`${baseURL}/work`, `${baseURL}/blog`],
    category: 'technology',
    classification: 'Portfolio',
    itunes: {
      appId: '',
    },
    facebook: {
      admins: [],
    },
    pinterest: {
      richPin: true,
    },
    verification: {
      other: {
        me: [person.email],
      },
    },
    other: {
      'portfolio:type': 'personal',
      'portfolio:role': person.role,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeConfig = {
    brand: style.brand,
    accent: style.accent,
    neutral: style.neutral,
    solid: style.solid,
    'solid-style': style.solidStyle,
    border: style.border,
    surface: style.surface,
    transition: style.transition,
    scaling: style.scaling,
    'viz-style': dataStyle.variant,
  };

  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
    >
      <head>
        <script
          id="theme-init"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Set defaults from config
                  const config = ${JSON.stringify(themeConfig)};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });

                  // Keep scrollbar colors in sync with effective brand/neutral values.
                  const effectiveBrand = localStorage.getItem('data-brand') || config.brand;
                  const effectiveNeutral = localStorage.getItem('data-neutral') || config.neutral;
                  root.style.setProperty('--scrollbar-track', 'var(--scheme-' + effectiveNeutral + '-200)');
                  root.style.setProperty('--scrollbar-thumb', 'var(--scheme-' + effectiveBrand + '-500)');
                  root.style.setProperty('--scrollbar-thumb-hover', 'var(--scheme-' + effectiveBrand + '-600)');
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: '100vh' }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <RevealFx fill fillWidth position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              {/* <RouteGuard> */}
                {children}
                <Analytics />
                <SpeedInsights />
              {/* </RouteGuard> */}
            </Flex>
          </Flex>
          <Footer />
          <Flex maxHeight={1}>
            <Fade
              zIndex="1"
              to="right"
              paddingX={12}
              fillWidth
              maxWidth={"90%"}
              position="absolute"
              left="0"
              top="0"
            />
            <AutoScroll paddingY="40" speed="slow">
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                Suvan GS
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                greeenboi
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                GreenArcade
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                Suvan GS
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                greeenboi
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                GreenArcade
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                Suvan GS
              </Text>
              <Text style={{ opacity: '0.15' }} variant="label-default-m">
                greeenboi
              </Text>
            </AutoScroll>
            <Fade
              zIndex="1"
              to="left"
              width="64"
              position="absolute"
              right="0"
              top="0"
            />
          </Flex>
        </Column>
      </Providers>
    </Flex>
  );
}
