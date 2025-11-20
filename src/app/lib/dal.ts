import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'tma_session';
const DEFAULT_SESSION_TTL = 60 * 60 * 24; // 1 day

export type TelegramUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
};

export type TelegramSession = {
  user: TelegramUser;
  authDate: number;
  hash?: string;
  createdAt: string;
};

const getSessionCookieValue = async (): Promise<TelegramSession | null> => {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as TelegramSession;
  } catch {
    return null;
  }
};

export const getSession = cache(async () => getSessionCookieValue());

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const maxAgeSeconds =
    Number(process.env.TMA_SESSION_MAX_AGE) || DEFAULT_SESSION_TTL;
  const expiresAt = session.authDate + maxAgeSeconds;
  const now = Math.floor(Date.now() / 1000);

  if (expiresAt < now) {
    return null;
  }

  return session;
});

export const getUser = cache(async () => {
  const session = await verifySession();
  return session?.user ?? null;
});

export async function persistSession(session: TelegramSession): Promise<void> {
  const maxAgeSeconds =
    Number(process.env.TMA_SESSION_MAX_AGE) || DEFAULT_SESSION_TTL;

  const store = await cookies();
  store.set({
    name: SESSION_COOKIE_NAME,
    value: JSON.stringify(session),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };


