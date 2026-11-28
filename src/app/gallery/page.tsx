import { Flex, Meta, Schema } from '@once-ui-system/core';
import GalleryView from '@/components/gallery/GalleryView';
import { baseURL, gallery, person } from '@/resources';
import { withCanonical } from '@/utils/seo';

export async function generateMetadata() {
  return withCanonical(
    Meta.generate({
      title: gallery.title,
      description: gallery.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
      path: gallery.path,
    }),
    gallery.path
  );
}

export default function Gallery() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
