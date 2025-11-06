'use client';

import { useEffect } from 'react';
import { useTelegramMainButton } from '@/hooks/use-telegram';

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  show?: boolean;
  progress?: boolean;
  color?: string;
  textColor?: string;
}

/**
 * Компонент для управления основной кнопкой Telegram Mini App
 * 
 * @example
 * ```tsx
 * <MainButton
 *   text="Продолжить"
 *   onClick={() => console.log('Clicked')}
 *   show={true}
 * />
 * ```
 */
export function MainButton({
  text,
  onClick,
  disabled = false,
  show = true,
  progress = false,
  color,
  textColor,
}: MainButtonProps) {
  const mainButton = useTelegramMainButton();

  useEffect(() => {
    mainButton.setText(text);
    
    if (show) {
      mainButton.show();
    } else {
      mainButton.hide();
    }
    
    if (disabled) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }
    
    if (progress) {
      mainButton.showLoader();
    } else {
      mainButton.hideLoader();
    }
    
    if (color) {
      mainButton.setBgColor(color as any);
    }
    
    if (textColor) {
      mainButton.setTextColor(textColor as any);
    }

    if (onClick) {
      mainButton.onClick(onClick);
      return () => {
        mainButton.offClick(onClick);
      };
    }
  }, [mainButton, text, onClick, disabled, show, progress, color, textColor]);

  // Этот компонент не рендерит ничего в DOM
  return null;
}

