import {
  Accordion,
  AccordionGroup,
  Button,
  Card,
  Carousel,
  Checkbox,
  CodeBlock,
  Column,
  Feedback,
  Grid,
  Heading,
  HeadingLink,
  Icon,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  type MediaProps,
  Row,
  SmartLink,
  type SmartLinkProps,
  Table,
  Text,
  type TextProps,
} from '@once-ui-system/core';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import type React from 'react';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import { slugify as transliterate } from 'transliteration';

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
    <SmartLink
      href={href}
      prefixIcon="link"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </SmartLink>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, ' and '); // Replace & with 'and'
  const slug = transliterate(strWithAnd, {
    lowercase: true,
    separator: '-', // Replace spaces with -
  })
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+|-+$/g, '');

  return slug || 'section';
}

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map(child => extractText(child))
      .join(' ')
      .trim();
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return '';
}

function createHeading(as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, 'as' | 'id'>) => {
    const slug = slugify(extractText(children));
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: '175%' }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children?.props?.className) {
    const { className, children } = props.children.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace('language-', '');
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children,
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList(as: 'ul' | 'ol') {
  return ({ children }: { children: ReactNode }) => (
    <List as={as}>{children}</List>
  );
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: '175%' }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

const Mention = ({
  name,
  href,
  ...rest
}: {
  name: string;
  href: string;
  rest: SmartLinkProps;
}) => (
  <SmartLink href={href} prefixIcon="link" {...rest}>
    @{name}
  </SmartLink>
);

const components = {
  p: createParagraph as any,
  h1: createHeading('h1') as any,
  h2: createHeading('h2') as any,
  h3: createHeading('h3') as any,
  h4: createHeading('h4') as any,
  h5: createHeading('h5') as any,
  h6: createHeading('h6') as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList('ol') as any,
  ul: createList('ul') as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Checkbox,
  Carousel,
  Mention: Mention,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      options={{ blockJS: false }}
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
