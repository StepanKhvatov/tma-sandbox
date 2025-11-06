'use client';

import { ReactNode, useEffect } from 'react';
import { init } from '@tma.js/sdk';

interface TelegramProviderProps {
  children: ReactNode;
}

/**
 * Провайдер для Telegram Mini App SDK
 * Инициализирует SDK и предоставляет доступ к Telegram WebApp API
 */
export function TelegramProvider({ children }: TelegramProviderProps) {
  useEffect(() => {
    // Проверяем, что мы в браузерном окружении
    if (typeof window === 'undefined') {
      return;
    }

    // Инициализация SDK с обработкой ошибок
    // В режиме разработки (вне Telegram) ошибка инициализации допустима
    const initializeSDK = () => {
      try {
        init();
      } catch (error: unknown) {
        // В режиме разработки приложение может работать без Telegram окружения
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        const errorName = error instanceof Error ? error.name : '';

        // Игнорируем ошибку LaunchParamsRetrieveError в режиме разработки
        if (
          process.env.NODE_ENV === 'development' ||
          errorName === 'LaunchParamsRetrieveError' ||
          errorMessage.includes('LaunchParamsRetrieveError') ||
          errorMessage.includes('Unable to retrieve launch parameters')
        ) {
          // В режиме разработки это ожидаемое поведение при запуске вне Telegram
          // Не логируем ошибку, чтобы не засорять консоль
          return;
        }

        // В production логируем ошибку, но не прерываем работу приложения
        console.error('Telegram SDK initialization failed:', error);
      }
    };

    // Обрабатываем необработанные ошибки промисов
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const errorMessage =
        reason instanceof Error ? reason.message : String(reason);
      const errorName = reason instanceof Error ? reason.name : '';

      // Игнорируем ошибки инициализации SDK в режиме разработки
      if (
        process.env.NODE_ENV === 'development' &&
        (errorName === 'LaunchParamsRetrieveError' ||
          errorMessage.includes('LaunchParamsRetrieveError') ||
          errorMessage.includes('Unable to retrieve launch parameters'))
      ) {
        event.preventDefault(); // Предотвращаем показ ошибки в консоли
        return;
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    initializeSDK();

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
    };
  }, []);

  return <>{children}</>;
}
