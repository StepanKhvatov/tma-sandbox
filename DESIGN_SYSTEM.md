# Дизайн-система Telegram Mini App

## Цветовая палитра

### Основные цвета Telegram

Используйте эти цвета для основных элементов интерфейса:

```css
/* Основной цвет Telegram */
bg-telegram-primary     /* #2481cc */
text-telegram-primary  /* #2481cc */

/* Состояния кнопок */
bg-telegram-primary-hover    /* #1e6ba8 */
bg-telegram-primary-active   /* #1a5a8f */
```

### Фоновые цвета

#### Светлая тема:

```css
bg-bg-primary      /* #ffffff - основной фон */
bg-bg-secondary    /* #f5f5f5 - вторичный фон */
bg-bg-tertiary     /* #e8e8e8 - третичный фон */
```

#### Темная тема (автоматически применяется):

```css
bg-bg-dark-primary    /* #212121 */
bg-bg-dark-secondary  /* #2d2d2d */
bg-bg-dark-tertiary  /* #3d3d3d */
```

### Текстовые цвета

#### Светлая тема:

```css
text-text-primary      /* #000000 - основной текст */
text-text-secondary    /* #707579 - вторичный текст */
text-text-tertiary     /* #999999 - третичный текст */
```

#### Темная тема:

```css
text-text-dark-primary    /* #ffffff */
text-text-dark-secondary  /* #b0b0b0 */
text-text-dark-tertiary   /* #808080 */
```

### Границы

```css
border-border-light  /* #e0e0e0 - для светлой темы */
border-border-dark   /* #404040 - для темной темы */
```

### Акцентные цвета

```css
bg-success   /* #4caf50 - успех */
bg-error     /* #f44336 - ошибка */
bg-warning   /* #ff9800 - предупреждение */
bg-info      /* #2196f3 - информация */
```

## Использование в компонентах

### Кнопки

```tsx
// Основная кнопка Telegram стиля
<button className="btn-telegram">
  Нажми меня
</button>

// С Tailwind классами
<button className="bg-telegram-primary text-white px-6 py-3 rounded-lg min-h-[44px]">
  Кнопка
</button>
```

### Карточки

```tsx
<div className="card">
  <h2>Заголовок</h2>
  <p>Содержимое карточки</p>
</div>
```

### Вводы

```tsx
<input type="text" className="input" placeholder="Введите текст" />
```

## Типографика

### Шрифт

Приложение использует шрифт **Inter** из Google Fonts через `next/font`:

- Поддержка латиницы и кириллицы
- Веса: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Оптимизированная загрузка через Next.js

### Размеры заголовков

```css
h1 {
  font-size: 2rem; /* 32px */
  font-weight: 700; /* Bold */
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.5rem; /* 24px */
  font-weight: 600; /* Semibold */
}

h3 {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
}

p {
  line-height: 1.6;
  font-size: 1rem; /* 16px */
}
```

### Использование в коде

```tsx
<h1 className="text-3xl font-bold">Заголовок</h1>
<h2 className="text-2xl font-semibold">Подзаголовок</h2>
<p className="text-base leading-relaxed">Основной текст</p>
```

## Адаптивность и сенсорный ввод

### Минимальные размеры для сенсорных элементов

- **Кнопки**: минимум 44px × 44px
- **Поля ввода**: минимум 44px высота
- **Интерактивные элементы**: достаточные отступы для удобного нажатия

### CSS переменные

```css
--spacing-touch: 2.75rem; /* 44px */
--spacing-touch-sm: 2rem; /* 32px */
```

## Темная тема

Темная тема применяется автоматически на основе системных настроек пользователя через `prefers-color-scheme: dark`.

Все цвета автоматически адаптируются под выбранную тему.

## Примеры использования

### Простая страница

```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Заголовок страницы</h1>
        <div className="card mb-4">
          <p className="text-text-secondary">Содержимое карточки</p>
        </div>
        <button className="btn-telegram">Основная кнопка</button>
      </div>
    </div>
  );
}
```

### Форма

```tsx
<form className="space-y-4">
  <div>
    <label className="block text-text-primary mb-2">Имя</label>
    <input type="text" className="input w-full" placeholder="Введите имя" />
  </div>
  <button type="submit" className="btn-telegram w-full">
    Отправить
  </button>
</form>
```

## Рекомендации

1. **Всегда используйте минимальные размеры 44px** для интерактивных элементов
2. **Используйте системные цвета** вместо кастомных для лучшей совместимости
3. **Тестируйте в светлой и темной темах**
4. **Проверяйте контрастность** текста на фонах
5. **Используйте классы компонентов** (.btn-telegram, .card, .input) для консистентности
