'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BackButton } from '@/components/telegram/back-button';
import { useTelegram } from '@/hooks/use-telegram';

export default function CurrencyExchangePage() {
  const t = useTranslations('currencyExchange');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <BackButton />
      <main className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="from-amount"
            type="number"
            label={t('fromAmount')}
            placeholder={t('fromAmountPlaceholder')}
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            required
          />

          <Input
            id="to-amount"
            type="number"
            label={t('toAmount')}
            placeholder={t('toAmountPlaceholder')}
            value={toAmount}
            onChange={e => setToAmount(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading}>
            {t('submit')}
          </Button>
        </form>
      </main>
    </div>
  );
}
