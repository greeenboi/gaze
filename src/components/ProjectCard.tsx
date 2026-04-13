'use client';

import {
  Carousel,
  Column,
  Flex,
  Heading,
  RevealFx,
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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <Column fillWidth gap="m">
      <RevealFx
        style={{ width: '100%' }}
        delay={0.4}
        trigger
        speed="fast"
      >
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
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && (
              <AvatarGroupHover avatars={avatars} size="m" />
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
        )}
      </Flex>
    </Column>
  );
};
