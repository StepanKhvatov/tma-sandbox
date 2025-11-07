'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';

export default function Home() {
  const t = useTranslations('i18n');

  return (
    <Page back={false}>
      <div className="list">
        <div className="section">
          <div className="section__header">Features</div>
          <div className="section__content">
            <Link href="/ton-connect">
              <div className="cell">
                <img
                  src="/ton.svg"
                  style={{ backgroundColor: '#007AFF', width: '24px', height: '24px', marginRight: '12px' }}
                  alt="TON Logo"
                />
                <div className="cell__content">
                  <div className="cell__title">TON Connect</div>
                  <div className="cell__subtitle">Connect your TON wallet</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="section__footer">You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects</div>
        </div>
        <div className="section">
          <div className="section__header">Application Launch Data</div>
          <div className="section__content">
            <Link href="/init-data">
              <div className="cell">
                <div className="cell__content">
                  <div className="cell__title">Init Data</div>
                  <div className="cell__subtitle">User data, chat information, technical data</div>
                </div>
              </div>
            </Link>
            <Link href="/launch-params">
              <div className="cell">
                <div className="cell__content">
                  <div className="cell__title">Launch Parameters</div>
                  <div className="cell__subtitle">Platform identifier, Mini Apps version, etc.</div>
                </div>
              </div>
            </Link>
            <Link href="/theme-params">
              <div className="cell">
                <div className="cell__content">
                  <div className="cell__title">Theme Parameters</div>
                  <div className="cell__subtitle">Telegram application palette information</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="section">
          <div className="section__header">{t('header')}</div>
          <div className="section__content">
            <LocaleSwitcher />
          </div>
          <div className="section__footer">{t('footer')}</div>
        </div>
      </div>
    </Page>
  );
}
