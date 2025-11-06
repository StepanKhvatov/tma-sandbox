'use client';

import { useState, useEffect } from 'react';
import { useTelegramUser } from '@/hooks/use-telegram';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  className?: string;
  size?: number;
}

export function UserAvatar({ className, size = 40 }: UserAvatarProps) {
  const user = useTelegramUser();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем наличие данных пользователя
  const hasUserData = user !== null && user !== undefined;
  const photoUrl = user?.photo_url;
  const hasPhoto = Boolean(photoUrl && !imageError);

  useEffect(() => {
    // Если нет фото или произошла ошибка, не показываем загрузку
    if (!photoUrl || imageError) {
      setIsLoading(false);
    }
  }, [photoUrl, imageError]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  // Состояние загрузки данных пользователя
  if (!hasUserData) {
    return (
      <Skeleton
        className={cn('rounded-full', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  // Плейсхолдер - инициалы или дефолтная иконка
  const getInitials = () => {
    if (!user) return '?';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    return '?';
  };

  const placeholderBgColor = 'bg-telegram-primary';
  const placeholderTextColor = 'text-white';

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full overflow-hidden',
        'border-2 border-border-light',
        className
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      {isLoading && hasPhoto && (
        <Skeleton className="absolute inset-0 rounded-full" />
      )}

      {hasPhoto ? (
        <img
          src={photoUrl}
          alt={user?.first_name || 'User'}
          className={cn('w-full h-full object-cover', isLoading && 'opacity-0')}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            'font-semibold text-sm',
            placeholderBgColor,
            placeholderTextColor
          )}
          style={{ fontSize: size * 0.4 }}
        >
          {getInitials()}
        </div>
      )}
    </div>
  );
}
