import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Link } from '@/i18n/routing';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div>
      <Header />
      <main className="px-4 py-6">
        <Link
          href="/currency-exchange"
          className="text-telegram-primary hover:text-telegram-primary-hover underline"
        >
          {t('goToCurrencyExchange')}
        </Link>
      </main>
    </div>
  );
}
