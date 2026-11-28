import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/resources/content';
import type { TeamMember } from '@/types';

export type PostMetadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  tags: string[];
  readingTime: number;
  team: TeamMember[];
  link?: string;
};

export type PostItem = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

// Static directory constants prevent Turbopack from tracing the entire project filesystem
const BLOG_POSTS_DIR = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
const WORK_PROJECTS_DIR = path.join(
  process.cwd(),
  'src',
  'app',
  'work',
  'projects'
);

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

const WORDS_PER_MINUTE = 200;

function getReadingTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

// Frontmatter `team` entries are either a key into `teamMembers` (config) or an inline member.
function resolveTeam(team: unknown): TeamMember[] {
  if (!Array.isArray(team)) return [];
  return team.flatMap(entry => {
    if (typeof entry === 'string') {
      const member = teamMembers[entry];
      return member ? [member] : [];
    }
    return entry ? [entry as TeamMember] : [];
  });
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);

  const metadata: PostMetadata = {
    title: data.title || '',
    subtitle: data.subtitle || '',
    publishedAt: data.publishedAt,
    summary: data.summary || '',
    image: data.image || '',
    images: Array.isArray(data.images) ? data.images : [],
    tag: typeof data.tag === 'string' ? data.tag : '',
    tags: Array.isArray(data.tags)
      ? data.tags.map(String)
      : typeof data.tag === 'string' && data.tag
        ? [data.tag]
        : [],
    readingTime: getReadingTime(content),
    team: resolveTeam(data.team),
    link: data.link || '',
  };

  return { metadata, content };
}

function getMDXData(dir: string): PostItem[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map(file => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(): PostItem[] {
  return getMDXData(BLOG_POSTS_DIR);
}

export function getWorkProjects(): PostItem[] {
  return getMDXData(WORK_PROJECTS_DIR);
}

export function getPosts(
  customPath: 'blog' | 'work' | string[] = 'blog'
): PostItem[] {
  if (customPath === 'work') {
    return getMDXData(WORK_PROJECTS_DIR);
  }
  if (customPath === 'blog') {
    return getMDXData(BLOG_POSTS_DIR);
  }
  const joined = customPath.join('/');
  if (joined.includes('work/projects')) {
    return getMDXData(WORK_PROJECTS_DIR);
  }
  return getMDXData(BLOG_POSTS_DIR);
}
