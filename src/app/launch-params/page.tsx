'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';

import { DisplayData } from '@/components/DisplayData';
import { TMABackButton } from '@/components/TMABackButton';

export default function LaunchParamsPage() {
  const lp = useLaunchParams();

  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        <DisplayData
          header={<h2 className="m-0">Launch Parameters</h2>}
          rows={[
            { title: 'tgWebAppPlatform', value: lp.tgWebAppPlatform },
            { title: 'tgWebAppShowSettings', value: lp.tgWebAppShowSettings },
            { title: 'tgWebAppVersion', value: lp.tgWebAppVersion },
            { title: 'tgWebAppBotInline', value: lp.tgWebAppBotInline },
            { title: 'tgWebAppStartParam', value: lp.tgWebAppStartParam },
            { title: 'tgWebAppData', type: 'link', value: '/init-data' },
            {
              title: 'tgWebAppThemeParams',
              type: 'link',
              value: '/theme-params',
            },
          ]}
        />
      </div>
    </>
  );
}
