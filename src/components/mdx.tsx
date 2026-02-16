import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import type React from 'react';
import type { ReactNode } from 'react';

import { InlineCode, SmartLink, Text  } from '@once-ui-system/core';
import { CodeBlock } from '@/once-ui/modules';
import { HeadingLink } from '@/components';

import type { TextProps } from '@/once-ui/interfaces';
import { Checkbox, Media, type SmartLinkProps } from '@once-ui-system/core';
import { SmartImage } from '@/once-ui/components';
import type { SmartImageProps } from '@/once-ui/components/SmartImage';


const Mention = ({ name, href, ...rest }: { name: string, href: string, rest :SmartLinkProps}) => (
    <SmartLink href={href} prefixIcon="link" suffixIcon="arrowRight" {...rest}>
      @{name}
    </SmartLink>
  );

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({
  alt,
  src,
  ...props
}: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      className="my-20"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: TextProps) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        style={{
          marginTop: 'var(--static-space-24)',
          marginBottom: 'var(--static-space-12)',
        }}
        level={level}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: '150%' }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  blockquote: (({ children }: TextProps) => (
    <blockquote
      style={{
        marginTop: 'var(--static-space-12)',
        marginBottom: 'var(--static-space-12)',
        padding: '12px 16px',
        borderLeft: '4px solid rgba(0,0,0,0.08)',
        background: 'rgba(0,0,0,0.02)',
        borderRadius: '6px',
      }}
    >
      <Text
        variant="body-default-m"
        onBackground="neutral-medium"
        style={{ margin: 0, fontStyle: 'italic' }}
      >
        {children}
      </Text>
    </blockquote>
  )) as any,
  hr: ((props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      style={{
        marginTop: 'var(--static-space-12)',
        marginBottom: 'var(--static-space-12)',
        border: 'none',
        borderRadius: '2px',
        height: '2px',
        width: '100%',
        background: 'rgb(255,255,255)',
      }}
      {...props}
    />
  )) as any,
  Media: Media,
  Checkbox: Checkbox,
  Mention: Mention,
  Table,
  CodeBlock,
  InlineCode,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore: Suppressing type error for MDXRemote usage
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
