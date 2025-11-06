'use client';

import { UserAvatar } from '@/components/ui/user-avatar';
import { TelegramErrorBoundary } from '@/components/providers/telegram-error-boundary';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between px-4 py-3 bg-bg-primary border-b border-border-light ${className || ''}`}
    >
      <div className="flex items-center gap-3">
        <TelegramErrorBoundary
          fallback={<div className="w-10 h-10 rounded-full bg-bg-secondary" />}
        >
          <UserAvatar size={40} />
        </TelegramErrorBoundary>
      </div>
    </header>
  );
}
