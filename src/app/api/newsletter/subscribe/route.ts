import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  getMailjetCredentials,
  getMailjetListId,
  isValidEmail,
  subscribeContactToList,
} from '@/utils/mailjet';

type SubscribeBody = {
  email?: string;
  name?: string;
};

export async function POST(request: NextRequest) {
  let body: SubscribeBody;

  try {
    body = (await request.json()) as SubscribeBody;
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
  const listId = getMailjetListId();

  if (!credentials || !listId) {
    console.error('Mailjet environment variables are not configured correctly');
    return NextResponse.json(
      { message: 'Newsletter service is not configured' },
      { status: 500 }
    );
  }

  try {
    const result = await subscribeContactToList({
      credentials,
      listId,
      email,
      name,
    });

    if (!result.ok) {
      console.error('Mailjet subscribe failed', result.status, result.data);
      return NextResponse.json(
        { message: 'Unable to subscribe at the moment' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Subscription created' },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Subscribe route error',
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { message: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
