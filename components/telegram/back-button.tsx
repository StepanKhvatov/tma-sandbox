'use client';

import { useEffect } from 'react';
import { useTelegramBackButton } from '@/hooks/use-telegram';

interface BackButtonProps {
  onClick?: () => void;
  show?: boolean;
}

/**
 * Компонент для управления кнопкой "Назад" в Telegram Mini App
 * 
 * @example
 * ```tsx
 * <BackButton
 *   onClick={() => router.back()}
 *   show={true}
 * />
 * ```
 */
export function BackButton({ onClick, show = false }: BackButtonProps) {
  const backButton = useTelegramBackButton();

  useEffect(() => {
    if (show) {
      backButton.show();
    } else {
      backButton.hide();
    }

    if (onClick) {
      const unsubscribe = backButton.onClick(onClick);
      return () => {
        backButton.offClick(onClick);
      };
    }
  }, [backButton, onClick, show]);

  // Этот компонент не рендерит ничего в DOM
  return null;
}

