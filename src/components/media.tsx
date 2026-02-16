'use client';
import { Media } from '@once-ui-system/core';
import React from 'react';

const OnceMedia = ({ video }: { video: { src: string; alt: string } }) => {
  return (
    <Media src={video.src} alt={video.alt} aspectRatio="16/9" radius="xl" />
  );
};

export default OnceMedia;
