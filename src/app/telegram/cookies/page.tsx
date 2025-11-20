'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { initDataRaw, useSignal } from '@telegram-apps/sdk-react';

import {
  DisplayData,
  type DisplayDataRow,
} from '@/components/DisplayData';
import { TMABackButton } from '@/components/TMABackButton';

type SessionResponse = {
  ok: boolean;
  session?: {
    user: {
      id: number;
      firstName: string;
      lastName?: string;
      username?: string;
      languageCode?: string;
    };
    authDate: number;
    hash?: string;
    createdAt: string;
  } | null;
  cookies?: { name: string; value: string }[];
  verification?: {
    required: boolean;
    verified: boolean;
    reason?: string;
  };
  error?: string;
  timestamp?: string;
};

const buttonStyles =
  'px-4 py-2 rounded-lg font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed';

const formatJson = (value?: unknown) =>
  value ? JSON.stringify(value, null, 2) : undefined;

export default function TelegramCookiesPage() {
  const initData = useSignal(initDataRaw);
  const [serverState, setServerState] = useState<SessionResponse | null>(null);
  const [clientCookies, setClientCookies] = useState<string>('');
  const [pending, setPending] = useState<'sync' | 'refresh' | 'clear' | null>(
    null
  );

  const refreshClientCookies = useCallback(() => {
    setClientCookies(document.cookie || '(empty)');
  }, []);

  const callApi = useCallback(
    async (
      method: 'GET' | 'POST' | 'DELETE',
      body?: Record<string, unknown>
    ) => {
      const response = await fetch('/api/telegram/session', {
        method,
        cache: 'no-store',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });

      const json = (await response.json()) as SessionResponse;
      setServerState(json);
      refreshClientCookies();
    },
    [refreshClientCookies]
  );

  const syncSession = useCallback(async () => {
    if (!initData) {
      setServerState({
        ok: false,
        error: 'Init data is not available. Open the Mini App from Telegram.',
      });
      return;
    }

    setPending('sync');
    try {
      await callApi('POST', { initDataRaw: initData });
    } finally {
      setPending(null);
    }
  }, [callApi, initData]);

  const refreshSession = useCallback(async () => {
    setPending('refresh');
    try {
      await callApi('GET');
    } finally {
      setPending(null);
    }
  }, [callApi]);

  const clearSession = useCallback(async () => {
    setPending('clear');
    try {
      await callApi('DELETE');
    } finally {
      setPending(null);
    }
  }, [callApi]);

  useEffect(() => {
    refreshClientCookies();
    void refreshSession();
  }, [refreshClientCookies, refreshSession]);

  const rows = useMemo<DisplayDataRow[]>(() => {
    const sessionJson = formatJson(serverState?.session);
    const cookiesJson = serverState?.cookies?.length
      ? serverState.cookies
      : undefined;

    return [
      {
        title: 'Init data available',
        value: Boolean(initData),
      },
      {
        title: 'Init data length',
        value: initData?.length || 'n/a',
      },
      {
        title: 'Client document.cookie',
        value: clientCookies || '(empty)',
      },
      {
        title: 'Server session payload',
        value: sessionJson ? (
          <pre className="font-mono text-xs whitespace-pre-wrap break-all">
            {sessionJson}
          </pre>
        ) : undefined,
      },
      {
        title: 'Server cookies',
        value: cookiesJson ? (
          <ul className="font-mono text-xs space-y-1">
            {cookiesJson.map(cookie => (
              <li key={cookie.name}>
                <strong>{cookie.name}</strong>=<span>{cookie.value}</span>
              </li>
            ))}
          </ul>
        ) : undefined,
      },
      {
        title: 'Verification required',
        value: serverState?.verification?.required ?? false,
      },
      {
        title: 'Verification passed',
        value: serverState?.verification?.verified ?? false,
      },
      {
        title: 'Verification note',
        value: serverState?.verification?.reason,
      },
      {
        title: 'Last server timestamp',
        value: serverState?.timestamp ?? '---',
      },
      {
        title: 'Last error',
        value: serverState?.error,
      },
    ];
  }, [clientCookies, initData, serverState]);

  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        <DisplayData
          header={<h2 className="m-0">Telegram Cookie Debugger</h2>}
          rows={rows}
          footer={
            <p className="m-0">
              Use this screen inside Telegram to verify if init data makes it to
              the server via secure cookies.
            </p>
          }
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`${buttonStyles} bg-blue-600 hover:bg-blue-700`}
            onClick={syncSession}
            disabled={!initData || pending !== null}
          >
            {pending === 'sync' ? 'Syncing…' : 'Sync from initData'}
          </button>
          <button
            type="button"
            className={`${buttonStyles} bg-gray-700 hover:bg-gray-800`}
            onClick={refreshSession}
            disabled={pending !== null}
          >
            {pending === 'refresh' ? 'Refreshing…' : 'Refresh server view'}
          </button>
          <button
            type="button"
            className={`${buttonStyles} bg-red-600 hover:bg-red-700`}
            onClick={clearSession}
            disabled={pending !== null}
          >
            {pending === 'clear' ? 'Clearing…' : 'Clear cookie'}
          </button>
        </div>
      </div>
    </>
  );
}


