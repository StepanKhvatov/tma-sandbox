// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.

import { retrieveLaunchParams, themeParams } from '@telegram-apps/sdk-react';
// import { init } from './core/init';
import { mockEnv } from './mockEnv';
import { init } from '@tma.js/sdk-react';

mockEnv().then(() => {
  try {
    // Configure all application dependencies.
    init();
  } catch (e) {
    console.log(e);
  }
});
