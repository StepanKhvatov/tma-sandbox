/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo } from 'react';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';

import {
  DisplayData,
  type DisplayDataRow,
} from '@/components/DisplayData';
import { TMABackButton } from '@/components/TMABackButton';

function getUserRows(user: User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export default function InitDataPage() {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
    return [
      { title: 'raw', value: initDataRaw },
      ...Object.entries(initDataState).reduce<DisplayDataRow[]>(
        (acc, [title, value]) => {
          if (value instanceof Date) {
            acc.push({ title, value: value.toISOString() });
          } else if (!value || typeof value !== 'object') {
            acc.push({ title, value });
          }
          return acc;
        },
        []
      ),
    ];
  }, [initDataState, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.receiver
      ? getUserRows(initDataState.receiver)
      : undefined;
  }, [initDataState]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return !initDataState?.chat
      ? undefined
      : Object.entries(initDataState.chat).map(([title, value]) => ({
          title,
          value,
        }));
  }, [initDataState]);

  if (!initDataRows) {
    return (
      <>
        <TMABackButton />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="prose prose-2xl max-w-none text-3xl font-bold mb-4 text-gray-900">
            Oops
          </div>
          <div className="prose prose-base max-w-md text-base mb-6 text-gray-500">
            <p>Application was launched with missing init data</p>
          </div>
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            className="w-36 h-36 rounded-2xl shadow-lg"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        <DisplayData
          header={<h2 className="m-0">Init Data</h2>}
          rows={initDataRows}
        />
        {userRows && (
          <DisplayData header={<h2 className="m-0">User</h2>} rows={userRows} />
        )}
        {receiverRows && (
          <DisplayData
            header={<h2 className="m-0">Receiver</h2>}
            rows={receiverRows}
          />
        )}
        {chatRows && (
          <DisplayData header={<h2 className="m-0">Chat</h2>} rows={chatRows} />
        )}
      </div>
    </>
  );
}
