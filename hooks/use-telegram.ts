'use client';

import {
  useLaunchParams,
  useRawInitData,
  useSignal,
} from '@tma.js/sdk-react';
import {
  initData,
  themeParams,
  viewport,
  cloudStorage,
  hapticFeedback,
  mainButton,
  backButton,
  miniApp,
  openLink,
  openTelegramLink,
  invoice,
  popup,
  qrScanner,
  settingsButton,
} from '@tma.js/sdk';

/**
 * Хук для удобного доступа ко всем функциям Telegram Mini App SDK
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const telegram = useTelegram();
 *   
 *   useEffect(() => {
 *     telegram.mainButton.setText('Нажми меня');
 *     telegram.mainButton.show();
 *   }, []);
 * }
 * ```
 */
export function useTelegram() {
  // Хуки должны вызываться всегда, но могут выбрасывать ошибки вне Telegram
  // Эти ошибки должны обрабатываться через Error Boundary
  const launchParams = useLaunchParams();
  const rawInitData = useRawInitData();

  // Получаем данные пользователя из initData
  // Используем useSignal для получения значения из Computed
  const userData = useSignal(initData.state);
  
  return {
    // Данные пользователя
    initData: userData,
    user: userData?.user,
    
    // Тема и внешний вид
    themeParams,
    viewport,
    
    // Функционал приложения
    miniApp,
    launchParams,
    
    // Кнопки
    mainButton,
    backButton,
    settingsButton,
    
    // Утилиты
    utils: {
      openLink,
      openTelegramLink,
    },
    cloudStorage,
    hapticFeedback,
    
    // Дополнительные функции
    invoice,
    popup,
    qrScanner,
    
    // Вспомогательные методы
    isReady: viewport.isExpanded,
    isDark: (() => {
      const bg = themeParams.bgColor();
      if (!bg) return false;
      // Простая проверка темной темы
      return bg.toLowerCase().startsWith('#') && 
        parseInt(bg.slice(1, 3), 16) < 128;
    })(),
  };
}

/**
 * Хук для получения данных пользователя
 */
export function useTelegramUser() {
  const { user } = useTelegram();
  return user;
}

/**
 * Хук для работы с темой
 */
export function useTelegramTheme() {
  const { themeParams, isDark } = useTelegram();
  return {
    themeParams,
    isDark,
    backgroundColor: themeParams.bgColor,
    textColor: themeParams.textColor,
    hintColor: themeParams.hintColor,
    linkColor: themeParams.linkColor,
    buttonColor: themeParams.buttonColor,
    buttonTextColor: themeParams.buttonTextColor,
  };
}

/**
 * Хук для работы с основной кнопкой
 */
export function useTelegramMainButton() {
  return mainButton;
}

/**
 * Хук для работы с кнопкой назад
 */
export function useTelegramBackButton() {
  return backButton;
}

