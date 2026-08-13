# PantryChef Frontend

**PantryChef** — умный помощник для вашего холодильника. Добавляйте продукты вручную, сканируйте штрих-коды или просто сфотографируйте полки — а ИИ превратит то, что есть под рукой, в рецепты, планы питания, списки покупок и вовремя напомнит о скоропортящихся продуктах.

Веб-клиент PantryChef: современный PWA-интерфейс на Next.js с тёплой «кухонной» дизайн-системой, работающий в паре с [PantryChef Backend](../pantry-chef-backend).

> Проект в активной разработке.

---

## Возможности

- **Холодильник под контролем** — продукты, категории, количество и сроки годности в одном месте.
- **AI-рецепты** — генерация блюд из того, что уже есть дома: учитывается время приготовления, сложность, кухня, диета и число порций.
- **Сканирование** — ручной ввод, штрих-коды и распознавание продуктов по фотографии полок холодильника.
- **Планы питания** — меню на несколько дней с приоритетом для скоропортящихся продуктов.
- **Списки покупок** — автоматическая генерация по выбранным рецептам с группировкой по категориям.
- **Алерты о сроках** — предупреждения об истекающих продуктах с рекомендациями, что с ними приготовить, заморозить или проверить.
- **Аутентификация** — email и пароль, двухфакторная защита (OTP) и вход через социальные провайдеры.
- **PWA** — устанавливается на главный экран устройства и присылает push-уведомления.
- **Тёмная и светлая тема** — системная тема, переключается без мигания при загрузке.

---

## Стек технологий

| Категория | Технология |
|---|---|
| **Framework** | Next.js 16.2.6 (App Router, React Server Components) |
| **UI-библиотека** | React 19.2.4 |
| **Язык** | TypeScript 5 (strict) |
| **Стилизация** | Tailwind CSS v4 (CSS-first, без JS-конфига) |
| **UI-кит** | shadcn (стиль `base-nova`) на примитивах `@base-ui/react` |
| **Иконки** | lucide-react, react-icons |
| **Варианты классов** | class-variance-authority + clsx + tailwind-merge |
| **Тематизация** | `@wrksz/themes` (системная тёмная/светлая, zero-flash SSR) |
| **Серверное состояние** | TanStack React Query 5 |
| **Формы и валидация** | react-hook-form + @hookform/resolvers + Zod |
| **OTP / 2FA** | input-otp |
| **Push-уведомления** | web-push (VAPID) + Server Actions |
| **Пакетный менеджер** | Bun |
| **Форматирование** | Prettier + @trivago/prettier-plugin-sort-imports + prettier-plugin-tailwindcss |
| **Линтер** | ESLint 9 (flat config) + eslint-config-next + eslint-plugin-fsd-lint |
| **Архитектура** | Feature-Sliced Design (FSD) |

---

## Архитектура

Проект построен по методологии **Feature-Sliced Design** поверх **Next.js App Router** с React Server Components. Каждый слой экспортирует публичный API через `index.ts`, а корректность импортов между слоями контролирует `eslint-plugin-fsd-lint`.

```
src/
├── app/          # Маршруты App Router, layout, глобальные стили, manifest, Server Actions
├── entities/     # Бизнес-сущности (пользователь, продукты, рецепты …) — модели и API
├── features/     # Пользовательские сценарии (аутентификация, сканирование, рецепты …)
├── widgets/      # Композиция экранов из features и entities
└── shared/       # UI-кит, дизайн-токены, утилиты, API-клиент
```

UI-кит — shadcn в стиле `base-nova` на примитивах **`@base-ui/react`**. Дизайн-система описана в цветовом пространстве OKLch: тёплая мандариново-карамельная палитра на кремовом фоне и «тёплом угле» в тёмной теме, плюс доменные токены свежести продуктов — `--fresh`, `--soon`, `--late`.

---

## Быстрый старт

### Требования

- Node.js 20+ или **Bun**
- Запущенный [PantryChef Backend](../pantry-chef-backend) (`http://localhost:4000`)

### Установка

```bash
bun install
cp .env.example .env   # если файла нет — создайте .env вручную (см. ниже)
bun run dev
```

Приложение запускается на `http://localhost:3000`.

### Переменные окружения

```env
# URL backend'а (публичный — доступен в браузере)
NEXT_PUBLIC_SERVER_URL=http://localhost:4000

# Web-push (VAPID). Публичный ключ виден клиенту и используется при подписке
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key

# Приватный VAPID-ключ — только серверная часть (Server Actions)
VAPID_PRIVATE_KEY=your-vapid-private-key
```

### Скрипты

```bash
bun run dev        # Dev-сервер (http://localhost:3000)
bun run build      # Production-сборка
bun run start      # Запуск production-сборки

bun run lint       # ESLint
bun run format     # Prettier
bun run typecheck  # Проверка типов (tsc --noEmit)
```
