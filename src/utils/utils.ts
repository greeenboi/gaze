import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { teamMembers } from '@/resources/content';
import type { TeamMember } from '@/types';

type Metadata = {
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

import { notFound } from 'next/navigation';

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

  const metadata: Metadata = {
    title: data.title || '',
    subtitle: data.subtitle || '',
    publishedAt: data.publishedAt,
    summary: data.summary || '',
    image: data.image || '',
    images: data.images || [],
    tag: data.tag || [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: getReadingTime(content),
    team: resolveTeam(data.team),
    link: data.link || '',
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
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

export function getPosts(customPath = ['', '', '', '']) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
