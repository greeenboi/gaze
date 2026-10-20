import { Column } from '@once-ui-system/core';
import { ProjectCard } from '@/components';
import { FilterableProjects } from '@/components/work/FilterableProjects';
import { getPosts } from '@/utils/utils';

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  filterable?: boolean;
}

export function Projects({ range, exclude, filterable }: ProjectsProps) {
  let allProjects = getPosts(['src', 'app', 'work', 'projects']);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter(post => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (filterable) {
    return <FilterableProjects projects={displayedProjects} />;
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={
            post.metadata.team?.map(member => ({
              name: member.name,
              description: member.description,
              src: member.avatar,
              role: member.role,
              linkedin: member.linkedIn ?? '',
            })) || []
          }
          tags={post.metadata.tags}
          readingTime={post.metadata.readingTime}
          publishedAt={post.metadata.publishedAt}
          link={post.metadata.link || ''}
        />
      ))}
    </Column>
  );
}
