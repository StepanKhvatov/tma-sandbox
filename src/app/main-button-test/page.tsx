'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TMABackButton } from '@/components/tma-back-button/TMABackButton';
import { TMAMainButton } from '@/components/tma-main-button/TMAMainButton';

export default function MainButtonTestPage() {
  const router = useRouter();
  const [number, setNumber] = useState<string>('');

  const handleMainButtonClick = () => {
    router.push('/');
  };

  return (
    <>
      <TMABackButton />
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="prose prose-lg max-w-none text-xl font-bold px-6 py-4 border-b text-gray-900 border-gray-200">
            <h2 className="m-0">Main Button Test</h2>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div>
              <label
                htmlFor="number-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter a number
              </label>
              <input
                id="number-input"
                type="number"
                value={number}
                onChange={e => setNumber(e.target.value)}
                placeholder="Enter a number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="text-sm text-gray-500">
              {number ? (
                <p>You entered: <strong>{number}</strong></p>
              ) : (
                <p>Enter a number in the input above</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <TMAMainButton
        onClick={handleMainButtonClick}
        isVisible={true}
        isEnabled={true}
      />
    </>
  );
}

