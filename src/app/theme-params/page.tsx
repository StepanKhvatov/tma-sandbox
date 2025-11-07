'use client';

import { themeParams, useSignal } from '@telegram-apps/sdk-react';
import { DisplayData } from '@/components/DisplayData';
import { TMABackButton } from '@/components/TMABackButton';

export default function ThemeParamsPage() {
  const tp = useSignal(themeParams.state);

  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        <DisplayData
          header={<h2 className="m-0">Theme Parameters</h2>}
          rows={Object.entries(tp).map(([title, value]) => ({
            title: title
              .replace(/[A-Z]/g, m => `_${m.toLowerCase()}`)
              .replace(/background/, 'bg'),
            value,
          }))}
        />
      </div>
    </>
  );
}
