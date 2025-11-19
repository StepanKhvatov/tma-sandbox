# Packages Overview

This document provides an overview of all packages used in this project, their purpose, and approximate bundle sizes.

## Production Dependencies

### Core Framework

#### `next@^16.0.1`
- **Purpose**: React framework for production with server-side rendering and static site generation
- **Size**: ~120MB (node_modules), ~200KB (production bundle)
- **Description**: The main framework that powers the application. Provides routing, SSR, API routes, and optimization features.

#### `react@^19.2.0` & `react-dom@^19.2.0`
- **Purpose**: JavaScript library for building user interfaces
- **Size**: ~2MB (node_modules), ~45KB (production bundle for React + ReactDOM)
- **Description**: Core React library and DOM renderer. React 19 includes concurrent features and improved performance.

### Telegram Mini Apps SDK

#### `@telegram-apps/sdk-react@^3.3.9`
- **Purpose**: Official Telegram Mini Apps SDK for React
- **Size**: ~500KB (node_modules), ~50KB (production bundle)
- **Description**: Provides React hooks and components to interact with Telegram Mini Apps API, including init data, theme params, and platform information.

#### `@tma.js/sdk-react@^3.0.8`
- **Purpose**: Alternative Telegram Mini Apps SDK with additional features
- **Size**: ~300KB (node_modules), ~40KB (production bundle)
- **Description**: Provides additional SDK functionality including back button and main button management. Used alongside @telegram-apps/sdk-react.

### TON Connect

#### `@tonconnect/ui-react@^2.3.1`
- **Purpose**: TON Connect UI components for React
- **Size**: ~2MB (node_modules), ~80KB (production bundle)
- **Description**: Provides UI components and hooks for integrating TON wallet connections in the application.

### Styling

#### `tailwindcss@^4.1.17`
- **Purpose**: Utility-first CSS framework
- **Size**: ~15MB (node_modules), ~10KB (production bundle - only used classes)
- **Description**: CSS framework for rapid UI development. Only used classes are included in the production bundle.

#### `@tailwindcss/postcss@^4.1.17`
- **Purpose**: PostCSS plugin for Tailwind CSS
- **Size**: Included in tailwindcss
- **Description**: PostCSS integration for Tailwind CSS processing.

#### `@tailwindcss/typography@^0.5.19`
- **Purpose**: Typography plugin for Tailwind CSS
- **Size**: ~50KB (node_modules), ~5KB (production bundle)
- **Description**: Adds beautiful typographic defaults to Tailwind CSS.

#### `tailwind-variants@^3.1.1`
- **Purpose**: Type-safe variant API for Tailwind CSS
- **Size**: ~100KB (node_modules), ~5KB (production bundle)
- **Description**: Provides a type-safe way to create component variants with Tailwind CSS.

#### `clsx@^2.1.1`
- **Purpose**: Utility for constructing className strings conditionally
- **Size**: ~5KB (node_modules), ~1KB (production bundle)
- **Description**: Small utility for conditionally joining classNames together.

### Internationalization

#### `next-intl@^4.4.0`
- **Purpose**: Internationalization (i18n) library for Next.js
- **Size**: ~2MB (node_modules), ~30KB (production bundle)
- **Description**: Provides internationalization support with server and client components, routing, and locale management.

### Development Tools (Production)

#### `eruda@^3.4.3`
- **Purpose**: Mobile web debugging tool
- **Size**: ~200KB (node_modules), ~50KB (production bundle - only in dev)
- **Description**: Console and DOM inspector for mobile browsers. Should only be used in development mode.

## Development Dependencies

### TypeScript

#### `typescript@^5.9.3`
- **Purpose**: Typed superset of JavaScript
- **Size**: ~50MB (node_modules), 0KB (production bundle)
- **Description**: Provides static type checking and modern JavaScript features. Only used during development and build.

#### `@types/node@^24.10.0`
- **Purpose**: TypeScript type definitions for Node.js
- **Size**: ~2MB (node_modules), 0KB (production bundle)
- **Description**: Type definitions for Node.js APIs.

#### `@types/react@^19.2.2` & `@types/react-dom@^19.2.2`
- **Purpose**: TypeScript type definitions for React
- **Size**: ~500KB (node_modules), 0KB (production bundle)
- **Description**: Type definitions for React and ReactDOM.

### Linting & Code Quality

#### `eslint@^9.39.1`
- **Purpose**: JavaScript and TypeScript linter
- **Size**: ~15MB (node_modules), 0KB (production bundle)
- **Description**: Pluggable linting utility for identifying and reporting code issues.

#### `eslint-config-next@^16.0.1`
- **Purpose**: ESLint configuration for Next.js
- **Size**: ~100KB (node_modules), 0KB (production bundle)
- **Description**: Official ESLint configuration for Next.js projects.

### Build Tools

#### `postcss@^8.5.6`
- **Purpose**: CSS post-processor
- **Size**: ~5MB (node_modules), 0KB (production bundle)
- **Description**: Tool for transforming CSS with JavaScript plugins. Used by Tailwind CSS.

## Bundle Size Summary

### Production Bundle (Estimated)
- **Core Framework**: ~250KB (Next.js + React)
- **Telegram SDKs**: ~90KB (@telegram-apps + @tma.js)
- **TON Connect**: ~80KB
- **Styling**: ~20KB (Tailwind + utilities)
- **i18n**: ~30KB
- **Total Estimated**: ~470KB (gzipped: ~150KB)

### Development Dependencies
- **TypeScript & Types**: ~55MB (not included in bundle)
- **Linting Tools**: ~15MB (not included in bundle)
- **Build Tools**: ~5MB (not included in bundle)

## Notes

- Bundle sizes are approximate and may vary based on actual usage
- Production bundle sizes are optimized by Next.js tree-shaking
- Development dependencies are not included in the production build
- Actual bundle size can be analyzed using `npm run build` and checking `.next` directory
- Consider using `@next/bundle-analyzer` for detailed bundle analysis

