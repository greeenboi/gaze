'use client';

import type React from 'react';
import { forwardRef } from 'react';

import { Avatar, type AvatarProps, Flex } from '.';
import styles from './AvatarGroup.module.scss';
import { Column, HoverCard, Icon, Row, SmartLink, Tag, Text } from '@once-ui-system/core';

interface AvatarGroupProps {
  avatars: AvatarProps[];
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  reverseOrder?: boolean;
  limit?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AvatarGroupHover = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { avatars, size = 'm', reverseOrder = false, limit, className, style },
    ref
  ) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount =
      limit && avatars.length > limit ? avatars.length - limit : 0;

    return (
      <Flex
        position="relative"
        alignItems="center"
        ref={ref}
        className={`${styles.avatarGroup} ${className || ''}`}
        style={style}
        zIndex={0}
      >
        {displayedAvatars.map((avatarProps, index) => (
          <HoverCard
            placement="top"
            key={index}
            trigger={
              <Avatar
                size={size}
                {...avatarProps}
                className={styles.avatar}
                style={{
                  ...avatarProps.style,
                  zIndex: reverseOrder
                    ? displayedAvatars.length - index
                    : index + 1,
                }}
              />
            }
          >
            <Column padding="20" gap="20" radius="l" maxWidth={24} background="page" border="neutral-alpha-weak">
              <Row gap="20" fillWidth vertical="center">
                <Avatar
                  key={index}
                  size={size}
                  {...avatarProps}
                  className={styles.avatar}
                  style={{
                    ...avatarProps.style,
                    zIndex: reverseOrder
                      ? displayedAvatars.length - index
                      : index + 1,
                  }}
                />
                <Column gap="4">
                  <Text variant="heading-strong-m">{avatarProps.name}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {avatarProps.role}
                  </Text>
                </Column>
              </Row>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {avatarProps.description}
              </Text>
              <SmartLink href={avatarProps.linkedin} fillWidth unstyled>
                <Row fillWidth background="surface" border="surface" radius="l" padding="16" horizontal="between" vertical="center">
                  <Text>Check me out on Linkedin</Text>
                  <Icon name="link" />
                </Row>
              </SmartLink>
            <Row gap="8" wrap>
              <Tag>Sofware Engineer</Tag>
              <Tag>Student</Tag>
              <Tag>Artist</Tag>
            </Row>
            </Column>
          </HoverCard>
        ))}
        {remainingCount > 0 && (
          <Avatar
            value={`+${remainingCount}`}
            className={styles.avatar}
            size={size}
            style={{
              ...style,
              zIndex: reverseOrder ? -1 : displayedAvatars.length + 1,
            }}
          />
        )}
      </Flex>
    );
  }
);


AvatarGroupHover.displayName = 'AvatarGroup';

export { AvatarGroupHover };
export type { AvatarGroupProps };
