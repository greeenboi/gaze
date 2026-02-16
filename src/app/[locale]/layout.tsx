import '@/once-ui/styles/index.scss';
import '@/once-ui/tokens/index.scss';

import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';


import classNames from 'classnames';

import { Footer, Header, RouteGuard } from '@/components';
import { baseURL, effects, style } from '@/app/resources';

import { Arimo } from 'next/font/google';
import { Raleway } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';

import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { renderContent } from '@/app/resources';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { AutoScroll, Fade, LayoutProvider, Text } from '@once-ui-system/core';
import { Background, Flex } from '@/once-ui/components';

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }) {
  const t = await getTranslations();
  const { person, home } = renderContent(t);

  return {
    metadataBase: new URL(`https://${baseURL}/${locale}`),
    title: home.title,
    description: home.description,
    alternates: {
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
      siteName: `${person.firstName}'s Portfolio`,
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const primary = Arimo({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
});

const secondary = Raleway({
  variable: '--font-secondary',
  subsets: ['latin'],
  display: 'swap',
});

const tertiary = Space_Grotesk({
  variable: '--font-tertiary',
  subsets: ['latin'],
  display: 'swap',
});

type FontConfig = {
  variable: string;
};

/*
 */

const code = Source_Code_Pro({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <LayoutProvider>
        <Flex
          as="html"
          lang="en"
          background="page"
          data-neutral={style.neutral}
          data-brand={style.brand}
          data-accent={style.accent}
          data-solid={style.solid}
          data-solid-style={style.solidStyle}
          data-theme={style.theme}
          data-border={style.border}
          data-surface={style.surface}
          data-transition={style.transition}
          className={classNames(
            primary.variable,
            secondary ? secondary.variable : '',
            tertiary ? tertiary.variable : '',
            code.variable
          )}
        >
          <Flex
            style={{ minHeight: '100vh' }}
            as="body"
            fillWidth
            margin="0"
            padding="0"
            direction="column"
          >
            <Background
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              mask={effects.mask as any}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              gradient={effects.gradient as any}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              dots={effects.dots as any}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              lines={effects.lines as any}
            />
            <Flex fillWidth minHeight="16" />
            <Header />
            <Flex
              zIndex={0}
              fillWidth
              paddingY="l"
              paddingX="l"
              justifyContent="center"
              flex={1}
            >
              <Flex justifyContent="center" fillWidth minHeight="0">
                <RouteGuard>
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </RouteGuard>
              </Flex>
            </Flex>
            <Footer />
            <Flex maxHeight={3}>
              <Fade zIndex="1" to="right" fillHeight width="64" position="absolute" left="0" top="0"/>
              <AutoScroll paddingY="40" speed='slow'>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>Suvan GS</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>greeenboi</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>GreenArcade</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>Suvan GS</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>greeenboi</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>GreenArcade</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>Suvan GS</Text>
                <Text style={{opacity:"0.15"}} variant='label-default-m'>greeenboi</Text>
              </AutoScroll>
              <Fade zIndex="1" to="left" fillHeight width="64" position="absolute" right="0" top="0"/>
            </Flex>
          </Flex>
        </Flex>
      </LayoutProvider>
    </NextIntlClientProvider>
  );
}
