import { getTranslations } from 'next-intl/server';

export default async function CurrencyExchangePage() {
  const t = await getTranslations('currencyExchange');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

