'use client';

import {
  Carousel,
  Heading,
  RevealFx,
  SmartLink,
  Text,
} from '@once-ui-system/core';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Flex } from '@/once-ui/components';
import { AvatarGroupHover } from '@/once-ui/components/AvatarGroupHover';

interface ProjectCardProps {
  href: string;
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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselItems = images.map((image, index) => ({
    slide: image,
    alt: `${title || 'Project'} image ${index + 1}`,
  }));

  const t = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex fillWidth gap="m" direction="column">
      {carouselItems.length > 0 && (
        <Flex fillWidth>
          <RevealFx
            style={{ width: '100%' }}
            delay={0.4}
            trigger={isTransitioning}
            speed="fast"
          >
            <Carousel
              style={{
                border: '1px solid var(--neutral-alpha-weak)',
                borderRadius: 'var(--radius-l)',
              }}
              controls={false}
              indicator={false}
              aspectRatio="16 / 9"
              play={{
                auto: carouselItems.length > 1,
                interval: 5000,
                controls: true,
                progress: true,
              }}
              items={carouselItems}
            />
          </RevealFx>
        </Flex>
      )}
      <Flex
        mobileDirection="column"
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
          <Flex flex={7} direction="column" gap="16">
            {avatars?.length > 0 && (
              <AvatarGroupHover avatars={avatars} size="m" reverseOrder />
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
            {content?.trim() && (
              <SmartLink
                suffixIcon="chevronRight"
                style={{ margin: '0', width: 'fit-content' }}
                href={href}
              >
                <Text variant="body-default-s">{t('projectCard.label')}</Text>
              </SmartLink>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
