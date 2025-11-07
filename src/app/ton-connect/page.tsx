'use client';

import { openLink } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

import { tv } from 'tailwind-variants/lite';
import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

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
      <Page>
        <div className={`placeholder ${placeholder()}`}>
          <div className="placeholder__header">TON Connect</div>
          <div className="placeholder__description">
            <p>
              To display the data related to the TON Connect, it is required
              to connect your wallet
            </p>
            <TonConnectButton className={button()} />
          </div>
        </div>
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <Page>
      <div className="list">
        {'imageUrl' in wallet && (
          <>
            <div className="section">
              <div
                className="cell"
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={wallet.imageUrl}
                  alt="Provider logo"
                  width={60}
                  height={60}
                  style={{ marginRight: '12px', borderRadius: '50%' }}
                />
                <div className="cell__content">
                  <h3 style={{ margin: 0 }}>{wallet.name}</h3>
                  <div className="cell__subtitle">{wallet.appName}</div>
                </div>
                <span className="navigation">About wallet</span>
              </div>
            </div>
            <TonConnectButton className={buttonConnected()} />
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
          ]}
        />
        <DisplayData
          header="Device"
          rows={[
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map((f) => (typeof f === 'object' ? f.name : undefined))
                .filter((v) => v)
                .join(', '),
            },
          ]}
        />
      </div>
    </Page>
  );
}
