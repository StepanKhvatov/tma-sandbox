# Telegram Mini App Sandbox

Проект Telegram Mini App на базе Next.js с поддержкой интернационализации.

## Стек технологий

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **next-intl** - интернационализация
- **Headless UI** - UI компоненты

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
app/
  [locale]/           # Интернационализированные страницы
    page.tsx          # Главная страница (/)
    profile/          # Страница профиля (/profile)
    currency-exchange/ # Страница обмена валюты (/currency-exchange)
messages/             # Файлы переводов
  en.json             # Английский
  ru.json             # Русский
```

## Роутинг

Проект поддерживает следующие локали:
- `en` (английский) - по умолчанию
- `ru` (русский)

Страницы доступны по адресам:
- `/[locale]` - главная страница
- `/[locale]/profile` - профиль
- `/[locale]/currency-exchange` - обмен валюты

Например:
- `/en` или `/ru` - главная
- `/en/profile` или `/ru/profile` - профиль
- `/en/currency-exchange` или `/ru/currency-exchange` - обмен валюты