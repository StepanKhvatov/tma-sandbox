# Руководство по использованию @tma.js/sdk-react

## Обзор

Пакет `@tma.js/sdk-react` предоставляет React-биндинги для работы с Telegram Mini App API. Он позволяет:

- Получать данные пользователя
- Управлять кнопками (MainButton, BackButton)
- Работать с темой приложения
- Использовать тактильную обратную связь
- Работать с облачным хранилищем
- И многое другое

Проект настроен для работы с пакетом `@tma.js/sdk-react` версии 3.0.8.

## Установка

Пакет уже установлен в проекте:

```bash
npm install @tma.js/sdk-react
```

## Структура интеграции

### Провайдеры

- **TelegramProvider** (`components/providers/telegram-provider.tsx`) - инициализирует SDK
- **TelegramThemeProvider** (`components/telegram/theme-provider.tsx`) - применяет тему Telegram

### Хуки

- **useTelegram()** - главный хук для доступа ко всем функциям SDK
- **useTelegramUser()** - быстрый доступ к данным пользователя
- **useTelegramTheme()** - работа с темой
- **useTelegramMainButton()** - управление основной кнопкой
- **useTelegramBackButton()** - управление кнопкой назад

### Компоненты

- **MainButton** - компонент для управления основной кнопкой
- **BackButton** - компонент для управления кнопкой "Назад"

## Настройка

Провайдер интегрирован в `app/[locale]/layout.tsx`. SDK инициализируется автоматически через `TelegramProvider`.

## Использование

### 1. Базовое использование

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';

export default function MyComponent() {
  const telegram = useTelegram();

  return (
    <div>
      <h1>Привет, {telegram.user?.firstName}!</h1>
      <p>ID: {telegram.user?.id}</p>
    </div>
  );
}
```

### 2. Работа с пользователем

```tsx
'use client';

import { useTelegramUser } from '@/hooks/use-telegram';

export default function UserInfo() {
  const user = useTelegramUser();

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>@{user.username}</p>
      <img src={user.photoUrl} alt="Avatar" />
    </div>
  );
}
```

### 3. Работа с основной кнопкой (MainButton)

#### Использование компонента:

```tsx
'use client';

import { MainButton } from '@/components/telegram/main-button';

export default function CheckoutPage() {
  const handleSubmit = () => {
    console.log('Оформление заказа');
  };

  return (
    <div>
      <h1>Оформление заказа</h1>
      <MainButton text="Оформить заказ" onClick={handleSubmit} show={true} />
    </div>
  );
}
```

#### Использование хука:

```tsx
'use client';

import { useTelegramMainButton } from '@/hooks/use-telegram';
import { useEffect } from 'react';

export default function MyPage() {
  const mainButton = useTelegramMainButton();

  useEffect(() => {
    mainButton.setText('Продолжить');
    mainButton.show();
    mainButton.enable();

    const unsubscribe = mainButton.onClick(() => {
      console.log('Кнопка нажата');
    });

    return () => {
      mainButton.hide();
      unsubscribe();
    };
  }, [mainButton]);

  return <div>Контент страницы</div>;
}
```

### 4. Работа с кнопкой "Назад" (BackButton)

```tsx
'use client';

import { BackButton } from '@/components/telegram/back-button';
import { useRouter } from 'next/navigation';

export default function DetailPage() {
  const router = useRouter();

  return (
    <>
      <BackButton onClick={() => router.back()} show={true} />
      <div>Детали</div>
    </>
  );
}
```

### 5. Работа с темой

```tsx
'use client';

import { useTelegramTheme } from '@/hooks/use-telegram';

export default function ThemedComponent() {
  const theme = useTelegramTheme();

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <p>Цвета автоматически берутся из Telegram</p>
    </div>
  );
}
```

### 6. Тактильная обратная связь (Haptic Feedback)

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';

export default function ButtonWithHaptic() {
  const { hapticFeedback } = useTelegram();

  const handleClick = () => {
    hapticFeedback.impactOccurred('medium');
    // Ваш код
  };

  return <button onClick={handleClick}>Нажми меня</button>;
}
```

### 7. Облачное хранилище (Cloud Storage)

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';
import { useState, useEffect } from 'react';

export default function StorageExample() {
  const { cloudStorage } = useTelegram();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // Чтение
    cloudStorage.getItem('myKey').then(setValue);
  }, [cloudStorage]);

  const handleSave = async () => {
    // Сохранение
    await cloudStorage.setItem('myKey', 'myValue');
    setValue('myValue');
  };

  return (
    <div>
      <p>Значение: {value || 'Нет данных'}</p>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
```

### 8. Утилиты (Utils)

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';

export default function UtilsExample() {
  const { utils } = useTelegram();

  const handleShare = () => {
    utils.openTelegramLink('https://t.me/share/url?url=...');
  };

  const handleOpenLink = () => {
    utils.openLink('https://example.com', { try_instant_view: true });
  };

  return (
    <div>
      <button onClick={handleShare}>Поделиться</button>
      <button onClick={handleOpenLink}>Открыть ссылку</button>
    </div>
  );
}
```

**Примечание**: В версии 3.0.8 SDK, методы `openLink` и `openTelegramLink` импортируются напрямую из `@tma.js/sdk`, а не через объект `utils`.

### 9. Проверка готовности SDK

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';

export default function ConditionalComponent() {
  const { isReady, user } = useTelegram();

  if (!isReady) {
    return <div>Загрузка...</div>;
  }

  return <div>Привет, {user?.firstName}!</div>;
}
```

## Доступные хуки из SDK

Из `@tma.js/sdk-react` доступны следующие хуки:

- `useInitData()` - данные инициализации
- `useThemeParams()` - параметры темы
- `useViewport()` - информация о viewport
- `useCloudStorage()` - облачное хранилище
- `useHapticFeedback()` - тактильная обратная связь
- `useMainButton()` - основная кнопка
- `useBackButton()` - кнопка назад
- `useMiniApp()` - информация о мини-приложении
- `useLaunchParams()` - параметры запуска
- `useUtils()` - утилиты
- `useInvoice()` - платежи
- `usePopup()` - всплывающие окна
- `useQRScanner()` - сканер QR-кодов
- `useSettingsButton()` - кнопка настроек

## Наши кастомные хуки

### `useTelegram()`

Главный хук, который объединяет все функции SDK:

```tsx
const telegram = useTelegram();
// Доступно: user, themeParams, mainButton, backButton, и т.д.
```

### `useTelegramUser()`

Быстрый доступ к данным пользователя:

```tsx
const user = useTelegramUser();
```

### `useTelegramTheme()`

Работа с темой:

```tsx
const theme = useTelegramTheme();
// theme.isDark, theme.backgroundColor, theme.textColor, и т.д.
```

### `useTelegramMainButton()`

Управление основной кнопкой:

```tsx
const mainButton = useTelegramMainButton();
```

### `useTelegramBackButton()`

Управление кнопкой назад:

```tsx
const backButton = useTelegramBackButton();
```

## Важные замечания

1. **Только клиентские компоненты**: Все компоненты, использующие SDK, должны быть помечены как `'use client'`

2. **Инициализация SDK**: SDK инициализируется автоматически через `TelegramProvider` в `app/[locale]/layout.tsx`

3. **Использование useSignal**: Используйте `useSignal` для получения значений из Computed свойств SDK

4. **Проверка готовности**: Всегда проверяйте `isReady` перед использованием SDK

5. **Очистка**: При использовании хуков, не забывайте очищать подписки в `useEffect`:

```tsx
useEffect(() => {
  const unsubscribe = mainButton.onClick(handler);
  return () => {
    unsubscribe(); // или mainButton.offClick(handler);
  };
}, [mainButton]);
```

6. **Валидация initData**: Всегда валидируйте `initData` на сервере перед использованием

7. **Обработка ошибок**: Обрабатывайте случаи, когда SDK еще не готов или данные недоступны. В режиме разработки (вне Telegram) ошибки инициализации SDK обрабатываются автоматически

## Примеры полных компонентов

### Страница профиля

```tsx
'use client';

import { useTelegram } from '@/hooks/use-telegram';
import { MainButton } from '@/components/telegram/main-button';

export default function ProfilePage() {
  const { user, isReady } = useTelegram();

  if (!isReady || !user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary">Имя</p>
          <p className="text-lg">
            {user.firstName} {user.lastName}
          </p>
        </div>
        {user.username && (
          <div>
            <p className="text-sm text-text-secondary">Username</p>
            <p className="text-lg">@{user.username}</p>
          </div>
        )}
      </div>
      <MainButton
        text="Редактировать"
        onClick={() => console.log('Edit')}
        show={true}
      />
    </div>
  );
}
```

## Дополнительные ресурсы

- [Официальная документация @tma.js/sdk-react](https://docs.telegram-mini-apps.com/packages/tma-js-sdk-react)
- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
