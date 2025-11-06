import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/header';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div>
      <Header />
      <main className="px-4 py-6">
        <h1>{t('title')}</h1>
      </main>
    </div>
  );
}
