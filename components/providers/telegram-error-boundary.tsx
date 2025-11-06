'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isTelegramError: boolean;
}

export class TelegramErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      isTelegramError: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Проверяем, является ли это ошибкой LaunchParamsRetrieveError
    const isLaunchParamsError =
      error.name === 'LaunchParamsRetrieveError' ||
      error.message.includes('LaunchParamsRetrieveError') ||
      error.message.includes('Unable to retrieve launch parameters');

    // В dev режиме или для LaunchParamsRetrieveError - показываем fallback
    // но не считаем это критической ошибкой, чтобы приложение продолжало работать
    if (
      process.env.NODE_ENV === 'development' ||
      isLaunchParamsError
    ) {
      // Возвращаем состояние, которое показывает fallback, но не блокирует приложение
      return { 
        hasError: true, 
        error: null, // Не сохраняем ошибку, чтобы не блокировать рендеринг
        isTelegramError: true,
      };
    }

    return { 
      hasError: true, 
      error,
      isTelegramError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логируем только если это не ожидаемая ошибка в dev режиме
    const isLaunchParamsError =
      error.name === 'LaunchParamsRetrieveError' ||
      error.message.includes('LaunchParamsRetrieveError') ||
      error.message.includes('Unable to retrieve launch parameters');

    // В dev режиме не логируем LaunchParamsRetrieveError
    if (
      process.env.NODE_ENV === 'development' &&
      isLaunchParamsError
    ) {
      return; // Игнорируем ошибку в dev режиме
    }

    if (
      process.env.NODE_ENV === 'production' &&
      !isLaunchParamsError
    ) {
      console.error('TelegramErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    // Если это ошибка Telegram SDK в dev режиме, показываем fallback
    // но не блокируем приложение полностью
    if (this.state.hasError && this.state.isTelegramError) {
      // В dev режиме показываем fallback или пустой контент
      // В production можно показать сообщение об ошибке
      return this.props.fallback || <div>{/* Пустой fallback для dev режима */}</div>;
    }

    if (this.state.hasError) {
      return this.props.fallback || <div>Произошла ошибка</div>;
    }

    return this.props.children;
  }
}

