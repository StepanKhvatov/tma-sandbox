'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/components/link/Link';
import { LocaleSwitcher } from '@/components/locale-switcher/LocaleSwitcher';

export default function Home() {
  const t = useTranslations('i18n');

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="prose prose-lg max-w-none text-xl font-bold px-6 py-4 border-b text-gray-900 border-gray-200">
          <h2 className="m-0">Features</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <Link href="/ton-connect">
            <div className="flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow">
                <img src="/ton.svg" className="w-6 h-6" alt="TON Logo" />
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold mb-1 text-gray-900">
                  TON Connect
                </div>
                <div className="text-sm text-gray-500">
                  Connect your TON wallet
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
        </div>
        <div className="prose prose-sm max-w-none px-6 py-4 text-sm text-gray-400 border-t border-gray-200">
          <p className="m-0">
            You can use these pages to learn more about features, provided by
            Telegram Mini Apps and other useful projects
          </p>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="prose prose-lg max-w-none text-xl font-bold px-6 py-4 border-b text-gray-900 border-gray-200">
          <h2 className="m-0">Application Launch Data</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <Link href="/init-data">
            <div className="flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">ID</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold mb-1 text-gray-900">
                  Init Data
                </div>
                <div className="text-sm text-gray-500">
                  User data, chat information, technical data
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
          <Link href="/launch-params">
            <div className="flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">LP</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold mb-1 text-gray-900">
                  Launch Parameters
                </div>
                <div className="text-sm text-gray-500">
                  Platform identifier, Mini Apps version, etc.
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
          <Link href="/theme-params">
            <div className="flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">TP</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold mb-1 text-gray-900">
                  Theme Parameters
                </div>
                <div className="text-sm text-gray-500">
                  Telegram application palette information
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="prose prose-lg max-w-none text-xl font-bold px-6 py-4 border-b text-gray-900 border-gray-200">
          <h2 className="m-0">{t('header')}</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="px-6 py-4">
            <LocaleSwitcher />
          </div>
        </div>
        <div className="prose prose-sm max-w-none px-6 py-4 text-sm text-gray-400 border-t border-gray-200">
          <p className="m-0">{t('footer')}</p>
        </div>
      </div>
    </div>
  );
}
