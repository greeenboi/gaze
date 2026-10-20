'use client';

import {
  Button,
  Chip,
  Column,
  Flex,
  Icon,
  Input,
  Select,
  Text,
} from '@once-ui-system/core';
import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';

export interface ProjectItem {
  slug: string;
  content: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    images: string[];
    tags: string[];
    readingTime: number;
    link?: string;
    team: {
      name: string;
      description: string;
      role: string;
      avatar: string;
      linkedIn?: string;
    }[];
  };
}

type SortKey = 'newest' | 'oldest' | 'shortest' | 'longest' | 'title';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'shortest', label: 'Shortest read' },
  { value: 'longest', label: 'Longest read' },
  { value: 'title', label: 'Title (A–Z)' },
];

const time = (p: ProjectItem) => new Date(p.metadata.publishedAt).getTime();

const SORTERS: Record<SortKey, (a: ProjectItem, b: ProjectItem) => number> = {
  newest: (a, b) => time(b) - time(a),
  oldest: (a, b) => time(a) - time(b),
  shortest: (a, b) => a.metadata.readingTime - b.metadata.readingTime,
  longest: (a, b) => b.metadata.readingTime - a.metadata.readingTime,
  title: (a, b) => a.metadata.title.localeCompare(b.metadata.title),
};

export function FilterableProjects({ projects }: { projects: ProjectItem[] }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const tag of p.metadata.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter(p => {
        if (
          selectedTags.length > 0 &&
          !selectedTags.every(t => p.metadata.tags.includes(t))
        ) {
          return false;
        }
        if (!q) return true;
        return [p.metadata.title, p.metadata.summary, ...p.metadata.tags]
          .join(' ')
          .toLowerCase()
          .includes(q);
      })
      .sort(SORTERS[sort]);
  }, [projects, query, selectedTags, sort]);

  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const hasFilters = query !== '' || selectedTags.length > 0;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      <Column fillWidth gap="m">
        <Flex fillWidth gap="m" s={{ direction: 'column' }}>
          <Flex flex={3}>
            <Input
              id="project-search"
              label="Search projects"
              hasPrefix={<Icon name="search" size="xs" />}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </Flex>
          <Flex flex={1}>
            <Select
              id="project-sort"
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              onSelect={value => setSort(value as SortKey)}
              fillWidth
            />
          </Flex>
        </Flex>
        <Flex gap="8" wrap vertical="center">
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
              style={{ cursor: 'pointer' }}
            />
          ))}
          {hasFilters && (
            <Button
              size="s"
              variant="tertiary"
              onClick={() => {
                setQuery('');
                setSelectedTags([]);
              }}
            >
              Clear filters
            </Button>
          )}
        </Flex>
        <Text variant="label-default-s" onBackground="neutral-weak">
          {visible.length} of {projects.length} projects
        </Text>
      </Column>

      {visible.length === 0 ? (
        <Text align="center" onBackground="neutral-weak">
          No projects match your search.
        </Text>
      ) : (
        visible.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            tags={post.metadata.tags}
            readingTime={post.metadata.readingTime}
            publishedAt={post.metadata.publishedAt}
            onTagClick={tag =>
              setSelectedTags(prev =>
                prev.includes(tag) ? prev : [...prev, tag]
              )
            }
            avatars={post.metadata.team.map(member => ({
              name: member.name,
              description: member.description,
              src: member.avatar,
              role: member.role,
              linkedin: member.linkedIn ?? '',
            }))}
            link={post.metadata.link || ''}
          />
        ))
      )}
    </Column>
  );
}
