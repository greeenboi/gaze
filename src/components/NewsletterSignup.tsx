'use client';

import type { opacity, SpacingToken } from '@once-ui-system/core';
import {
  Background,
  Button,
  Column,
  Heading,
  Input,
  Row,
  Text,
} from '@once-ui-system/core';
import { useMemo, useState } from 'react';
import { mailjet, newsletter } from '@/resources';

type SubscribeResponse = {
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterSignup: React.FC<
  React.ComponentProps<typeof Column>
> = ({ ...flex }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isEmailValid = useMemo(() => EMAIL_PATTERN.test(email), [email]);

  if (newsletter.display === false) {
    return null;
  }

  const parseResponse = async (
    response: Response
  ): Promise<SubscribeResponse> => {
    try {
      return (await response.json()) as SubscribeResponse;
    } catch {
      return {};
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');

    if (!EMAIL_PATTERN.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const subscribeResponse = await fetch(mailjet.subscribeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
        }),
      });

      const subscribeBody = await parseResponse(subscribeResponse);

      if (!subscribeResponse.ok) {
        throw new Error(subscribeBody.message || 'Unable to subscribe right now.');
      }

      const confirmResponse = await fetch(mailjet.confirmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          variables: {
            firstName: name.trim() || 'friend',
            subscribedAt: new Date().toISOString(),
          },
        }),
      });

      const confirmBody = await parseResponse(confirmResponse);

      if (!confirmResponse.ok) {
        throw new Error(
          confirmBody.message ||
            'Subscription succeeded, but confirmation email could not be sent.'
        );
      }

      setName('');
      setEmail('');
      setSuccessMessage('You are subscribed. Please check your inbox.');
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Unexpected error while subscribing.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailjet.effects.mask.x,
          y: mailjet.effects.mask.y,
          radius: mailjet.effects.mask.radius,
          cursor: mailjet.effects.mask.cursor,
        }}
        gradient={{
          display: mailjet.effects.gradient.display,
          opacity: mailjet.effects.gradient.opacity as opacity,
          x: mailjet.effects.gradient.x,
          y: mailjet.effects.gradient.y,
          width: mailjet.effects.gradient.width,
          height: mailjet.effects.gradient.height,
          tilt: mailjet.effects.gradient.tilt,
          colorStart: mailjet.effects.gradient.colorStart,
          colorEnd: mailjet.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailjet.effects.dots.display,
          opacity: mailjet.effects.dots.opacity as opacity,
          size: mailjet.effects.dots.size as SpacingToken,
          color: mailjet.effects.dots.color,
        }}
        grid={{
          display: mailjet.effects.grid.display,
          opacity: mailjet.effects.grid.opacity as opacity,
          color: mailjet.effects.grid.color,
          width: mailjet.effects.grid.width,
          height: mailjet.effects.grid.height,
        }}
        lines={{
          display: mailjet.effects.lines.display,
          opacity: mailjet.effects.lines.opacity as opacity,
          size: mailjet.effects.lines.size as SpacingToken,
          thickness: mailjet.effects.lines.thickness,
          angle: mailjet.effects.lines.angle,
          color: mailjet.effects.lines.color,
        }}
      />

      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {newsletter.title}
        </Heading>
        <Text
          wrap="balance"
          marginBottom="l"
          variant="body-default-l"
          onBackground="neutral-weak"
        >
          {newsletter.description}
        </Text>
      </Column>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Column maxHeight="xs" horizontal='center' gap="8">
            <Row
                fillWidth
                maxWidth={48}
                s={{ direction: 'column' }}
                gap="8"
                align="center"
            >
            <Input
                id="newsletter-name"
                name="name"
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <Input
                formNoValidate
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={event => {
                setEmail(event.target.value);
                if (error) {
                    setError('');
                }
                }}
                onBlur={() => {
                if (email && !isEmailValid) {
                    setError('Please enter a valid email address.');
                }
                }}
                errorMessage={error}
            />
            </Row>
            <Row height="48" vertical="center" fillWidth>
                <Button
                    id="newsletter-subscribe"
                    type="submit"
                    size="m"
                    fillWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    >
                    Subscribe
                </Button>
            </Row>
                {successMessage ? (
                    <Text onBackground="success-strong" variant="label-default-s">
                    {successMessage}
                    </Text>
                ) : null}
        </Column>
      </form>
    </Column>
  );
};
