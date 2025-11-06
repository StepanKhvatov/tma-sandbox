'use client';

import { ReactNode } from 'react';

interface TelegramSafeWrapperProps {
  children: ReactNode;
}

/**
 * Обертка, которая позволяет приложению работать даже если Telegram SDK недоступен
 * В dev режиме всегда разрешает рендеринг
 */
export function TelegramSafeWrapper({ children }: TelegramSafeWrapperProps) {
  // В dev режиме всегда разрешаем рендеринг
  // В production Error Boundary обработает ошибки
  return <>{children}</>;
}
