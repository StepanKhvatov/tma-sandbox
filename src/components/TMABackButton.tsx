'use client';

import { backButton, useSignal } from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const TMABackButton = () => {
  const router = useRouter();

  const isVisible = useSignal(backButton.isVisible);

  useEffect(() => {
    console.log('The button is', isVisible ? 'visible' : 'invisible');
  }, [isVisible]);

  useEffect(() => {
    backButton.mount();
    backButton.show();

    backButton.onClick(() => {
      router.back();
    });

    return () => {
      backButton.hide();
      backButton.unmount();
    };
  }, []);

  return null;
};

