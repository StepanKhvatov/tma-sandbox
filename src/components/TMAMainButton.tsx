'use client';

import { mainButton, useSignal } from '@tma.js/sdk-react';
import { useEffect, type FC } from 'react';

export interface TMAMainButtonProps {
  text?: string;
  onClick?: () => void;
  isVisible?: boolean;
  isEnabled?: boolean;
  isLoaderVisible?: boolean;
  bgColor?: string;
  textColor?: string;
  hasShineEffect?: boolean;
}

export const TMAMainButton: FC<TMAMainButtonProps> = ({
  text,
  onClick,
  isVisible = true,
  isEnabled = true,
  isLoaderVisible = false,
  bgColor,
  textColor,
  hasShineEffect,
}) => {
  const buttonState = useSignal(mainButton.state);
  const buttonIsVisible = useSignal(mainButton.isVisible);
  const buttonIsEnabled = useSignal(mainButton.isEnabled);

  useEffect(() => {
    console.log('Main button state:', buttonState);
    console.log('Main button is', buttonIsVisible ? 'visible' : 'invisible');
    console.log('Main button is', buttonIsEnabled ? 'enabled' : 'disabled');
  }, [buttonState, buttonIsVisible, buttonIsEnabled]);

  useEffect(() => {
    mainButton.mount();

    // Set button parameters
    const params: Parameters<typeof mainButton.setParams>[0] = {
      text: text || 'Continue',
      isVisible,
      isEnabled,
      isLoaderVisible,
      ...(hasShineEffect !== undefined && { hasShineEffect }),
    };

    if (bgColor && bgColor.startsWith('#')) {
      params.bgColor = bgColor as `#${string}`;
    }

    if (textColor && textColor.startsWith('#')) {
      params.textColor = textColor as `#${string}`;
    }

    mainButton.setParams(params);

    // Set up click handler if provided
    if (onClick) {
      mainButton.onClick(onClick);
    }

    return () => {
      if (onClick) {
        mainButton.offClick(onClick);
      }
      mainButton.setParams({ isVisible: false });
      mainButton.unmount();
    };
  }, [
    text,
    onClick,
    isVisible,
    isEnabled,
    isLoaderVisible,
    bgColor,
    textColor,
    hasShineEffect,
  ]);

  return null;
};

