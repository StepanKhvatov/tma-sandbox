'use client';

import { openLink } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

import { tv } from 'tailwind-variants/lite';
import { DisplayData } from '@/components/DisplayData';
import { TMABackButton } from '@/components/TMABackButton';

const tonConnectPage = tv({
  slots: {
    placeholder: '',
    button: '',
    buttonConnected: '',
  },
});

const { placeholder, button, buttonConnected } = tonConnectPage();

export default function TONConnectPage() {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <>
        <TMABackButton />
        <div
          className={`flex flex-col items-center justify-center min-h-screen p-6 text-center ${placeholder()}`}
        >
          <div className="prose prose-2xl max-w-none text-3xl font-bold mb-4 text-gray-900">
            TON Connect
          </div>
          <div className="prose prose-base max-w-md text-base mb-6 text-gray-500">
            <p>
              To display the data related to the TON Connect, it is required to
              connect your wallet
            </p>
            <div className="mt-6">
              <TonConnectButton className={button()} />
            </div>
          </div>
        </div>
      </>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        {'imageUrl' in wallet && (
          <>
            <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
              <div
                className="flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 group cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <img
                  src={wallet.imageUrl}
                  alt="Provider logo"
                  className="w-16 h-16 rounded-full mr-4 shadow-md ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1 text-gray-900 m-0">
                    {wallet.name}
                  </h3>
                  <div className="text-sm text-gray-500">{wallet.appName}</div>
                </div>
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  About wallet →
                </span>
              </div>
            </div>
            <TonConnectButton className={buttonConnected()} />
          </>
        )}
        <DisplayData
          header={<h2 className="m-0">Account</h2>}
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
          ]}
        />
        <DisplayData
          header={<h2 className="m-0">Device</h2>}
          rows={[
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map(f => (typeof f === 'object' ? f.name : undefined))
                .filter(v => v)
                .join(', '),
            },
          ]}
        />
      </div>
    </>
  );
}
