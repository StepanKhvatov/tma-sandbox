'use client';

import { useEffect } from 'react';
import { useSignal } from '@tma.js/sdk-react';
import { themeParams } from '@tma.js/sdk';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Провайдер темы, который применяет цвета Telegram к приложению
 */
export function TelegramThemeProvider({ children }: ThemeProviderProps) {
  const bgColor = useSignal(themeParams.bgColor);
  const textColor = useSignal(themeParams.textColor);
  const hintColor = useSignal(themeParams.hintColor);
  const linkColor = useSignal(themeParams.linkColor);
  const buttonColor = useSignal(themeParams.buttonColor);
  const buttonTextColor = useSignal(themeParams.buttonTextColor);

  useEffect(() => {
    // Применяем цвета Telegram к CSS переменным
    if (bgColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color',
        bgColor
      );
    }

    if (textColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-text-color',
        textColor
      );
    }

    if (hintColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-hint-color',
        hintColor
      );
    }

    if (linkColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-link-color',
        linkColor
      );
    }

    if (buttonColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-button-color',
        buttonColor
      );
    }

    if (buttonTextColor) {
      document.documentElement.style.setProperty(
        '--tg-theme-button-text-color',
        buttonTextColor
      );
    }

    // Определяем темную тему по цветам (если bgColor темный, то тема темная)
    if (bgColor) {
      // Простая проверка: если цвет начинается с темных оттенков
      const isDark = bgColor.toLowerCase().startsWith('#') && 
        parseInt(bgColor.slice(1, 3), 16) < 128;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [bgColor, textColor, hintColor, linkColor, buttonColor, buttonTextColor]);

  return <>{children}</>;
}

