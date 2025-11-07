'use client';

import { themeParams, useSignal } from '@telegram-apps/sdk-react';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

export default function ThemeParamsPage() {
  const tp = useSignal(themeParams.state);

  return (
    <Page>
      <div className="list">
        <DisplayData
          rows={Object.entries(tp).map(([title, value]) => ({
            title: title
              .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
              .replace(/background/, 'bg'),
            value,
          }))}
        />
      </div>
    </Page>
  );
}
