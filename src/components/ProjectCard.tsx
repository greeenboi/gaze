'use client';

import {
  Carousel,
  Chip,
  Column,
  Flex,
  Heading,
  RevealFx,
  Row,
  SmartLink,
  Text,
} from '@once-ui-system/core';
import { AvatarGroupHover } from './work/AvatarGroupHover';

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: {
    src: string;
    name: string;
    description: string;
    role: string;
    linkedin: string;
  }[];
  link: string;
  tags?: string[];
  readingTime?: number;
  publishedAt?: string;
  onTagClick?: (tag: string) => void;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  tags = [],
  readingTime,
  publishedAt,
  onTagClick,
}) => {
  return (
    <Column fillWidth gap="m">
      <RevealFx style={{ width: '100%' }} delay={0.4} trigger speed="fast">
        <Carousel
          indicator="line"
          priority={priority}
          aspectRatio="16 / 9"
          sizes="(max-width: 768px) 100vw, 960px"
          items={images.map(image => ({
            slide: image,
            alt: title,
          }))}
        />
      </RevealFx>
      <Flex
        s={{ direction: 'column' }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Column flex={5} gap="8">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            <Flex gap="8" vertical="center" wrap>
              {tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={onTagClick ? () => onTagClick(tag) : undefined}
                  style={onTagClick ? { cursor: 'pointer' } : undefined}
                />
              ))}
            </Flex>
          </Column>
        )}
        {(avatars?.length > 0 ||
          description?.trim() ||
          content?.trim() ||
          tags.length > 0) && (
          <Row flex={7} gap="16">
            {avatars?.length > 0 && (
              <AvatarGroupHover avatars={avatars} size="m" />
            )}
            <Column flex={7} gap="16">
              {(publishedAt || readingTime || tags.length > 0) && (
                <Flex gap="8" vertical="center" wrap>
                  {(publishedAt || readingTime) && (
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {[
                        publishedAt && formatDate(publishedAt),
                        readingTime && `${readingTime} min read`,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </Text>
                  )}
                  
                </Flex>
              )}
              {description?.trim() && (
                <Text
                  wrap="balance"
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  {description}
                </Text>
              )}
              <Flex gap="24" wrap>
                {content?.trim() && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    style={{ margin: '0', width: 'fit-content' }}
                    href={href}
                  >
                    <Text variant="body-default-s">Read case study</Text>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: '0', width: 'fit-content' }}
                    href={link}
                  >
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          </Row>
        )}
      </Flex>
    </Column>
  );
};
