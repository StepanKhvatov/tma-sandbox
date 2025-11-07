'use client';

import { backButton, useSignal } from '@tma.js/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();

  const isVisible = useSignal(backButton.isVisible);

  useEffect(() => {
    console.log('The button is', isVisible ? 'visible' : 'invisible');
  }, [isVisible]);

  useEffect(() => {
    if (back) {
      backButton.mount();
      backButton.show();
      backButton.onClick(() => {
        router.back();
      });
    }

    return () => {
      if (back) {
        backButton.hide();
        backButton.unmount();
      }
    };
  }, [back]);

  return <>{children}</>;
}
