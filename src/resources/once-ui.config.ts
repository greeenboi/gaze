import type {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailjetConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from '@/types';
import { home } from './index';

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = 'https://www.suvangs.tech';

const routes: RoutesConfig = {
  '/': true,
  '/about': true,
  '/work': true,
  '/blog': true,
  '/gallery': true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutesConfig = {
  '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true,
};

// Import and set font for each variant
import { Geist, Geist_Mono } from 'next/font/google';

const heading = Geist({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const body = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const label = Geist({
  variable: '--font-label',
  subsets: ['latin'],
  display: 'swap',
});

const code = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: 'dark', // dark | light | system
  neutral: 'slate', // sand | gray | slate | mint | rose | dusk | custom
  brand: 'indigo', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: 'violet', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: 'contrast', // color | contrast
  solidStyle: 'plastic', // flat | plastic
  border: 'playful', // rounded | playful | conservative | sharp
  surface: 'translucent', // filled | translucent
  transition: 'all', // all | micro | macro
  scaling: '100', // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: 'gradient', // flat | gradient | outline
  mode: 'categorical', // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: 'var(--neutral-alpha-weak)',
  },
  tick: {
    fill: 'var(--neutral-on-background-weak)',
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: true,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: 'accent-background-strong',
    colorEnd: 'page-background',
  },
  dots: {
    display: true,
    opacity: 40,
    size: '2',
    color: 'brand-background-strong',
  },
  grid: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-medium',
    width: '0.25rem',
    height: '0.25rem',
  },
  lines: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-weak',
    size: '16',
    thickness: 1,
    angle: 45,
  },
};

const mailjet: MailjetConfig = {
  subscribeEndpoint: '/api/newsletter/subscribe',
  confirmEndpoint: '/api/newsletter/confirm',
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: 'accent-background-strong',
      colorEnd: 'static-transparent',
    },
    dots: {
      display: true,
      opacity: 20,
      size: '2',
      color: 'brand-on-background-weak',
    },
    grid: {
      display: false,
      opacity: 100,
      color: 'neutral-alpha-medium',
      width: '0.25rem',
      height: '0.25rem',
    },
    lines: {
      display: false,
      opacity: 100,
      color: 'neutral-alpha-medium',
      size: '16',
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data
const schema: SchemaConfig = {
  logo: '',
  type: 'Individual',
  name: 'Suvan Gowri Shanker',
  description: home.description,
  email: 'suvan.gowrishanker.204@gmail.com',
};

// social links
const sameAs: SameAsConfig = {
  threads: 'https://www.threads.com/@once_ui',
  linkedin: 'https://www.linkedin.com/in/suvangs',
  discord: 'https://discord.com/invite/5EyAQ4eNdS',
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: true,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  baseURL,
  dataStyle,
  display,
  effects,
  fonts,
  mailjet,
  protectedRoutes,
  routes,
  sameAs,
  schema,
  socialSharing,
  style,
};
