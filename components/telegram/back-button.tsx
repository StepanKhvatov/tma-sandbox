'use client';

import { useEffect } from 'react';
import { backButton, useSignal } from '@tma.js/sdk-react';
interface BackButtonProps {
  onClick?: () => void;
  show?: boolean;
}

export function BackButton({}: BackButtonProps) {
  const isVisible = useSignal(backButton.isVisible);

  useEffect(() => {
    console.log('The button is', isVisible ? 'visible' : 'invisible');
  }, [isVisible]);

  useEffect(() => {
    backButton.show();
    return () => {
      backButton.hide();
    };
  }, []);

  // Этот компонент не рендерит ничего в DOM
  return null;
}
