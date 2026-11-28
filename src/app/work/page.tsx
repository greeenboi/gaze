import { Column, Heading, Meta } from '@once-ui-system/core';
import { JsonLd } from '@/components/JsonLd';
import { Projects } from '@/components/work/Projects';
import { baseURL, work } from '@/resources';
import { getWorkCollectionSchema } from '@/utils/schema';
import { withCanonical } from '@/utils/seo';
import { getPosts } from '@/utils/utils';

export async function generateMetadata() {
  return withCanonical(
    Meta.generate({
      title: work.title,
      description: work.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: work.path,
    }),
    work.path,
    ['Open Source Projects', 'Software Portfolio', 'Rust', 'Tauri', 'Next.js']
  );
}

export default function Work() {
  const projects = getPosts(['src', 'app', 'work', 'projects']).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <JsonLd data={getWorkCollectionSchema(projects)} />
      <Heading
        as="h1"
        marginBottom="l"
        variant="heading-strong-xl"
        align="center"
      >
        {work.title}
      </Heading>
      <Projects filterable />
    </Column>
  );
}
