import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  getMailjetCredentials,
  getMailjetSender,
  getMailjetTemplateId,
  isValidEmail,
  sendConfirmationTemplate,
} from '@/utils/mailjet';

type ConfirmBody = {
  email?: string;
  name?: string;
  variables?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  let body: ConfirmBody;

  try {
    body = (await request.json()) as ConfirmBody;
  } catch {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Please provide a valid email address' },
      { status: 400 }
    );
  }

  const credentials = getMailjetCredentials();
  const sender = getMailjetSender();
  const templateId = getMailjetTemplateId();

  if (!credentials || !sender || !templateId) {
    console.error('Mailjet confirmation environment variables are incomplete');
    return NextResponse.json(
      { message: 'Confirmation service is not configured' },
      { status: 500 }
    );
  }

  try {
    const result = await sendConfirmationTemplate({
      credentials,
      sender,
      templateId,
      email,
      name,
      variables: body.variables,
    });

    if (!result.ok) {
      console.error('Mailjet confirmation send failed', result.status, result.data);
      return NextResponse.json(
        { message: 'Unable to send confirmation email' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Confirmation email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Confirm route error',
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { message: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
