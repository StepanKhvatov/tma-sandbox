import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';

import {
  clearSession,
  persistSession,
  verifySession,
  type TelegramSession,
} from '@/app/lib/dal';

type TelegramInitUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

type VerificationResult = {
  required: boolean;
  verified: boolean;
  reason?: string;
};

type ApiPayload =
  | {
      ok: true;
      session: TelegramSession | null;
      cookies: { name: string; value: string }[];
      verification?: VerificationResult;
    }
  | {
      ok: false;
      error: string;
      cookies: { name: string; value: string }[];
      verification?: VerificationResult;
    };

const summarizeCookies = async () => {
  const store = await cookies();
  return store.getAll().map(({ name, value }) => ({ name, value }));
};

const jsonResponse = (body: ApiPayload, init?: ResponseInit) => {
  const headers = new Headers(init?.headers);
  headers.set('cache-control', 'no-store');

  return Response.json(
    {
      ...body,
      timestamp: new Date().toISOString(),
    },
    { ...init, headers }
  );
};

const parseInitData = (raw: string) => {
  const params = new URLSearchParams(raw);
  const authDate = Number(params.get('auth_date')) || Math.floor(Date.now() / 1000);
  const userRaw = params.get('user');

  let user: Record<string, unknown> | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw) as Record<string, unknown>;
    } catch {
      user = null;
    }
  }

  return { params, authDate, user };
};

const verifyInitDataHash = (params: URLSearchParams): VerificationResult => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return {
      required: false,
      verified: false,
      reason: 'TELEGRAM_BOT_TOKEN is not configured, skipping verification',
    };
  }

  const hash = params.get('hash');

  if (!hash) {
    return {
      required: true,
      verified: false,
      reason: 'Missing hash parameter',
    };
  }

  const dataCheckString = [...params.entries()]
    .filter(([key]) => key !== 'hash')
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  const secret = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const expected = createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  if (hash.length !== expected.length) {
    return {
      required: true,
      verified: false,
      reason: 'Hash length mismatch',
    };
  }

  try {
    const verified = timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expected, 'hex')
    );

    return {
      required: true,
      verified,
      reason: verified ? undefined : 'Hash verification failed',
    };
  } catch {
    return {
      required: true,
      verified: false,
      reason: 'Unable to parse hash as hex string',
    };
  }
};

export async function GET(): Promise<Response> {
  const session = await verifySession();
  const cookieDump = await summarizeCookies();

  return jsonResponse({
    ok: true,
    session,
    cookies: cookieDump,
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  let payload: Record<string, unknown> | null = null;
  try {
    const json = await req.json();
    if (json && typeof json === 'object') {
      payload = json as Record<string, unknown>;
    }
  } catch {
    payload = null;
  }

  let initData =
    req.nextUrl.searchParams.get('initDataRaw') ||
    req.nextUrl.searchParams.get('initData') ||
    null;

  if (!initData && payload) {
    if (typeof payload.initDataRaw === 'string') {
      initData = payload.initDataRaw;
    } else if (typeof payload.initData === 'string') {
      initData = payload.initData;
    }
  }

  if (!initData) {
    const cookieDump = await summarizeCookies();
    return jsonResponse(
      {
        ok: false,
        error: 'initDataRaw is required',
        cookies: cookieDump,
      },
      { status: 400 }
    );
  }

  const parsed = parseInitData(initData);

  const rawUser = parsed.user as TelegramInitUser | null;

  if (!rawUser?.id) {
    const cookieDump = await summarizeCookies();
    return jsonResponse(
      {
        ok: false,
        error: 'user data is missing or malformed in initDataRaw',
        cookies: cookieDump,
      },
      { status: 422 }
    );
  }

  const verification = verifyInitDataHash(parsed.params);
  if (verification.required && !verification.verified) {
    const cookieDump = await summarizeCookies();
    return jsonResponse(
      {
        ok: false,
        error: verification.reason ?? 'Failed to verify init data hash',
        cookies: cookieDump,
        verification,
      },
      { status: 401 }
    );
  }

  const session: TelegramSession = {
    user: {
      id: rawUser.id,
      firstName: rawUser.first_name ?? 'User',
      lastName: rawUser.last_name ?? undefined,
      username: rawUser.username ?? undefined,
      languageCode: rawUser.language_code ?? undefined,
    },
    authDate: parsed.authDate,
    hash: parsed.params.get('hash') ?? undefined,
    createdAt: new Date().toISOString(),
  };

  await persistSession(session);
  const cookieDump = await summarizeCookies();

  return jsonResponse({
    ok: true,
    session,
    cookies: cookieDump,
    verification,
  });
}

export async function DELETE(): Promise<Response> {
  await clearSession();
  const cookieDump = await summarizeCookies();

  return jsonResponse({
    ok: true,
    session: null,
    cookies: cookieDump,
  });
}


