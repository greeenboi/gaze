type MailjetApiResult<T = unknown> = {
  ok: boolean;
  status: number;
  data: T | null;
};

type MailjetCredentials = {
  apiKey: string;
  secretKey: string;
};

type MailjetSender = {
  email: string;
  name: string;
};

const MAILJET_API_BASE = 'https://api.mailjet.com';
const MAILJET_TIMEOUT_MS = 10000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function getMailjetCredentials(): MailjetCredentials | null {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return null;
  }

  return { apiKey, secretKey };
}

export function getMailjetListId(): string | null {
  return process.env.MAILJET_NEWSLETTER_LIST_ID || null;
}

export function getMailjetTemplateId(): number | null {
  const templateValue = process.env.MAILJET_CONFIRM_TEMPLATE_ID;
  if (!templateValue) {
    return null;
  }

  const parsed = Number(templateValue);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getMailjetSender(): MailjetSender | null {
  const email = process.env.MAILJET_SENDER_EMAIL;
  if (!email) {
    return null;
  }

  return {
    email,
    name: process.env.MAILJET_SENDER_NAME || 'Newsletter',
  };
}

function getAuthHeader({ apiKey, secretKey }: MailjetCredentials): string {
  const token = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
  return `Basic ${token}`;
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function mailjetRequest<T = unknown>(
  path: string,
  credentials: MailjetCredentials,
  body: unknown
): Promise<MailjetApiResult<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MAILJET_TIMEOUT_MS);

  try {
    const response = await fetch(`${MAILJET_API_BASE}${path}`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(credentials),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = (await parseJson(response)) as T;

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function subscribeContactToList({
  credentials,
  listId,
  email,
  name,
}: {
  credentials: MailjetCredentials;
  listId: string;
  email: string;
  name?: string;
}): Promise<MailjetApiResult> {
  return mailjetRequest(
    `/v3/REST/contactslist/${listId}/managemanycontacts`,
    credentials,
    {
      Action: 'addnoforce',
      Contacts: [
        {
          Email: email,
          Name: name || undefined,
          IsExcludedFromCampaigns: 'false',
        },
      ],
    }
  );
}

export async function sendConfirmationTemplate({
  credentials,
  sender,
  templateId,
  email,
  name,
  variables,
}: {
  credentials: MailjetCredentials;
  sender: MailjetSender;
  templateId: number;
  email: string;
  name?: string;
  variables?: Record<string, unknown>;
}): Promise<MailjetApiResult> {
  return mailjetRequest('/v3.1/send', credentials, {
    Messages: [
      {
        From: {
          Email: sender.email,
          Name: sender.name,
        },
        To: [
          {
            Email: email,
            Name: name || email,
          },
        ],
        TemplateID: templateId,
        TemplateLanguage: true,
        Subject: process.env.MAILJET_CONFIRM_SUBJECT ||
          'Newsletter subscription confirmation',
        Variables: {
          firstName: name || 'friend',
          email,
          ...(variables || {}),
        },
      },
    ],
  });
}
