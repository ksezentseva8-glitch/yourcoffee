# 🚀 YourCoffee AI - ПОЛНОЕ ПОШАГОВОЕ РУКОВОДСТВО

## ЭТАП 1️⃣: ПОДГОТОВКА НА ЛОКАЛЬНОЙ МАШИНЕ

### Шаг 1.1: Установка необходимых программ

Перед началом убедись, что у тебя установлены:

```bash
# Проверь Node.js версию (нужна 18+)
node --version
# Если не установлен, скачай с https://nodejs.org/ (LTS)

# Проверь npm
npm --version

# Проверь git
git --version
```

### Шаг 1.2: Клонирование проекта

```bash
# Открой терминал (PowerShell на Windows, Terminal на Mac/Linux)
# Перейди в папку, где хочешь сохранить проект
cd ~/Projects  # или любая другая папка

# Клонируй репозиторий
git clone https://github.com/ksezentseva8-glitch/yourcoffee
cd yourcoffee
```

### Шаг 1.3: Создание файла .env.local

```bash
# Скопируй пример
cp .env.example .env.local

# На Windows используй:
type .env.example > .env.local
```

### Шаг 1.4: Откройте .env.local в текстовом редакторе

Открой файл `.env.local` в VS Code или другом редакторе:

```env
# ЭТОТ ФАЙЛ БУДЕТ ЗАПОЛНЕН НА ШАГАХ 2 И 3

TG_BOT_TOKEN=YOUR_BOT_TOKEN_FROM_BOTFATHER
TG_MINI_APP_URL=https://yourcoffee.vercel.app
TG_BOT_USERNAME=your_bot_username
DATABASE_URL="postgresql://user:password@localhost:5432/yourcoffee"
NEXT_PUBLIC_API_URL=http://localhost:3000
OPENWEATHER_KEY=your_openweather_key
OPENAI_KEY=your_openai_key
```

### Шаг 1.5: Установка зависимостей

```bash
# В папке yourcoffee выполни:
npm install

# Это установит все нужные пакеты (это займёт 2-5 минут)
```

---

## ЭТАП 2️⃣: СОЗДАНИЕ TELEGRAM БОТА (@BotFather)

### Шаг 2.1: Открой Telegram и найди BotFather

1. Открой Telegram
2. В поиске напиши `@BotFather` и нажми на результат
3. Убедись, что это официальный бот (галочка синяя)

### Шаг 2.2: Создание нового бота

1. Напиши в чате: `/newbot`
2. BotFather спросит **"Choose a name for your bot"** (Имя бота):
   - Напиши: `YourCoffee AI`
   - Нажми отправить

3. BotFather спросит **"Choose a username for your bot"** (Юзернейм):
   - Напиши: `yourcoffee_bot` (или другой уникальный, должен заканчиваться на `_bot`)
   - Нажми отправить

### Шаг 2.3: Получение токена

BotFather отправит сообщение:

```
✅ Done! Congratulations on your new bot. You will find it at t.me/yourcoffee_bot. 
You can now add a description, about section and profile picture for your bot, see /help for a list of commands.

Use this token to access the HTTP API:

6123456789:ABCDefghijklmnopqrstuvwxyz1234567890
```

**ВАЖНО: Скопируй этот длинный токен!**

### Шаг 2.4: Вставка токена в .env.local

Открой файл `.env.local` и замени строку:

```env
# ДО:
TG_BOT_TOKEN=YOUR_BOT_TOKEN_FROM_BOTFATHER

# ПОСЛЕ (вставь свой токен):
TG_BOT_TOKEN=6123456789:ABCDefghijklmnopqrstuvwxyz1234567890
```

### Шаг 2.5: Вставка юзернейма в .env.local

```env
# ДО:
TG_BOT_USERNAME=your_bot_username

# ПОСЛЕ:
TG_BOT_USERNAME=yourcoffee_bot
```

---

## ЭТАП 3️⃣: НАСТРОЙКА БАЗЫ ДАННЫХ (ЛОКАЛЬНО)

### Вариант A: PostgreSQL на локальной машине (Docker - РЕКОМЕНДУЕТСЯ)

#### Шаг 3.1: Установка Docker

1. Скачай Docker Desktop: https://www.docker.com/products/docker-desktop
2. Установи его
3. Запусти Docker Desktop
4. Проверь в терминале:

```bash
docker --version
```

#### Шаг 3.2: Создание docker-compose.yml

В корне проекта создай файл `docker-compose.yml` со следующим содержимым:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: yourcoffee_db
    environment:
      POSTGRES_USER: yourcoffee_user
      POSTGRES_PASSWORD: yourcoffee_password
      POSTGRES_DB: yourcoffee
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U yourcoffee_user -d yourcoffee"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

#### Шаг 3.3: Запуск базы данных

```bash
# В папке проекта выполни:
docker-compose up -d

# Проверь, что контейнер запущен:
docker-compose ps
# Должен быть "yourcoffee_db" со статусом "Up"
```

#### Шаг 3.4: Вставка DATABASE_URL в .env.local

```env
# ДО:
DATABASE_URL="postgresql://user:password@localhost:5432/yourcoffee"

# ПОСЛЕ (для docker-compose):
DATABASE_URL="postgresql://yourcoffee_user:yourcoffee_password@localhost:5432/yourcoffee"
```

### Вариант B: Supabase (облако - АЛЬТЕРНАТИВА)

#### Шаг 3.1: Создание Supabase проекта

1. Перейди на https://supabase.com
2. Нажми **"Start your project"**
3. Залогинься через GitHub (или email)
4. Нажми **"New project"**
5. Заполни:
   - Project name: `yourcoffee`
   - Database password: `strong_password_here`
   - Region: `Europe (eu-west-1)` или ближайший к тебе
6. Нажми **"Create new project"**

#### Шаг 3.2: Получение CONNECTION STRING

1. В левом меню нажми **"Settings" → "Database"**
2. Скопируй **"Connection string"** (URI)
3. Он выглядит так: `postgresql://postgres.abcdef:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`

#### Шаг 3.3: Вставка в .env.local

```env
DATABASE_URL="postgresql://postgres.abcdef:PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
```

---

## ЭТАП 4️⃣: ЗАПУСК ЛОКАЛЬНОГО СЕРВЕРА

### Шаг 4.1: Генерация Prisma клиента

```bash
# В папке проекта:
npx prisma generate
```

### Шаг 4.2: Миграция базы данных

```bash
# Создаёт таблицы в БД
npx prisma migrate deploy

# Или если хочешь с интерактивным названием:
npx prisma migrate dev --name init
```

### Шаг 4.3: Запуск dev сервера

```bash
# В той же папке проекта:
npm run dev

# Увидишь:
# ➜  Local:   http://localhost:3000
# ➜  press h + enter to show help
```

### Шаг 4.4: Проверка, что сервер работает

Открой в браузере: `http://localhost:3000`

Должно выбросить ошибку (потому что Mini App нужен контекст Telegram, но это нормально)

---

## ЭТАП 5️⃣: ТЕСТИРОВАНИЕ WEBHOOK (ЛОКАЛЬНО С NGROK)

### Шаг 5.1: Установка ngrok

1. Перейди на https://ngrok.com
2. Нажми **"Sign up"** → регистрируйся
3. Скачай ngrok для своей ОС
4. Распакуй и положи в удобную папку
5. Открой терминал в папке ngrok и проверь:

```bash
./ngrok version
```

### Шаг 5.2: Создание публичного URL

```bash
# В терминале ngrok (отдельный терминал):
./ngrok http 3000

# Увидишь:
# Forwarding    https://abc123def456.ngrok.io -> http://localhost:3000

# СКОПИРУЙ: https://abc123def456.ngrok.io
```

### Шаг 5.3: Установка webhook

Открой новый терминал и выполни (замени TOKEN и URL):

```bash
# Замени ВСЁ ЗАГЛАВНОЕ на своё:
curl -X POST https://api.telegram.org/bot6123456789:ABCDefghijklmnopqrstuvwxyz1234567890/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://abc123def456.ngrok.io/api/telegram/webhook"}'

# Ответ должен быть:
# {"ok":true,"result":true,"description":"Webhook was set"}
```

### Шаг 5.4: Тестирование бота

1. Открой Telegram и найди своего бота (`@yourcoffee_bot`)
2. Напиши `/start`
3. Должно ответить сообщением с кнопкой
4. В терминале где `npm run dev` должны появиться логи

---

## ЭТАП 6️⃣: ДЕПЛОЙ НА VERCEL

### Шаг 6.1: Подготовка к пушу в GitHub

```bash
# Убедись, что все файлы сохранены
# В VS Code: Ctrl+K Ctrl+S (или Cmd+K Cmd+S на Mac)

# В терминале проекта:
git add .
git commit -m "Initial YourCoffee setup - ready for Vercel deploy"
git push origin main
```

### Шаг 6.2: Вход на Vercel

1. Перейди на https://vercel.com
2. Нажми **"Sign Up"** (или "Log In" если уже зарегистрирован)
3. Выбери **"GitHub"** и авторизуйся
4. Дай доступ к своим репозиториям

### Шаг 6.3: Создание проекта на Vercel

1. Нажми **"New Project"**
2. В списке репозиториев найди **`yourcoffee`** и нажми **"Import"**
3. Vercel автоматически определит **Next.js** как Framework
4. Нажми **"Continue"**

### Шаг 6.4: Добавление переменных окружения

1. Перейди на **"Environment Variables"**
2. Добавь переменные (кнопка **"Add"** для каждой):

```
Название: TG_BOT_TOKEN
Значение: 6123456789:ABCDefghijklmnopqrstuvwxyz1234567890
Databases: НЕ выбирай

Название: TG_MINI_APP_URL
Значение: https://yourcoffee.vercel.app

Название: DATABASE_URL
Значение: postgresql://user:pass@host:5432/yourcoffee

Название: OPENWEATHER_KEY
Значение: (можешь оставить пусто сейчас)

Название: OPENAI_KEY
Значение: (можешь оставить пусто сейчас)
```

3. После добавления каждой нажми **"Save"**

### Шаг 6.5: Деплой

1. Нажми **"Deploy"**
2. Ждёшь 1-3 минуты
3. Увидишь ✅ **"Congratulations! Your project has been successfully deployed"**
4. Скопируй URL: `https://yourcoffee.vercel.app` (он будет указан)

### Шаг 6.6: Обновление MINI_APP_URL локально

```env
# В .env.local замени:
TG_MINI_APP_URL=https://yourcoffee.vercel.app  # Вставь свой URL с Vercel
```

---

## ЭТАП 7️⃣: НАСТРОЙКА WEBHOOK НА VERCEL

### Шаг 7.1: Установка webhook на боте

В терминале выполни (замени своими значениями):

```bash
curl -X POST https://api.telegram.org/bot6123456789:ABCDefghijklmnopqrstuvwxyz1234567890/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourcoffee.vercel.app/api/telegram/webhook"}'

# Ответ: {"ok":true,"result":true,"description":"Webhook was set"}
```

### Шаг 7.2: Проверка webhook

```bash
# Проверь, что webhook установлен:
curl https://api.telegram.org/bot6123456789:ABCDefghijklmnopqrstuvwxyz1234567890/getWebhookInfo

# Ответ должен включать:
# "url": "https://yourcoffee.vercel.app/api/telegram/webhook"
```

---

## ЭТАП 8️⃣: НАСТРОЙКА MINI APP В TELEGRAM

### Шаг 8.1: Открой BotFather снова

1. В Telegram найди `@BotFather`
2. Напиши команду: `/setmenu`
3. BotFather спросит: выбери **@yourcoffee_bot**

### Шаг 8.2: Добавление меню

Отправь в BotFather:

```
/setmenu
→ Выбери @yourcoffee_bot
→ Нажми "Add Menu Button"
```

Ответь на вопросы:

1. "Button text?" → Ответ: `☕ Открыть меню`
2. "Button action?" → Выбери **Web App**
3. "Web App URL?" → Ответ: `https://yourcoffee.vercel.app`

### Шаг 8.3: Проверка в боте

1. Открой Telegram
2. Найди своего бота `@yourcoffee_bot`
3. Напиши `/start`
4. Должно появиться сообщение с кнопкой **"☕ Открыть меню"**
5. Нажми кнопку → должно открыться твоё Mini App приложение

---

## ЭТАП 9️⃣: ДОБАВЛЕНИЕ КОМАНД БОТА

### Шаг 9.1: Настройка команд

В BotFather напиши `/setcommands`

Выбери `@yourcoffee_bot`

Отправь список команд:

```
/start - Начало работы
/menu - Открыть меню
/stats - Статистика (только админам)
/help - Справка
```

### Шаг 9.2: Проверка

В боте напиши `/` и должны появиться все команды

---

## ЭТАП 🔟: СОЗДАНИЕ АДМИНА

### Шаг 10.1: Получение твоего Telegram ID

1. Открой Telegram
2. Найди бота `@userinfobot`
3. Напиши `/start`
4. Скопируй свой **User ID** (число вроде 123456789)

### Шаг 10.2: Добавление админа в БД

```bash
# Открой Prisma Studio:
npx prisma studio

# Откроется веб-интерфейс http://localhost:5555
# В левом меню выбери "AdminUser"
# Нажми "Add record" и заполни:

# Field: telegramId
# Value: 123456789 (твой User ID, БЕЗ кавычек)

# Field: role
# Value: owner

# Field: username
# Value: your_username

# Нажми "Save"
```

### Шаг 10.3: Тестирование

В боте напиши `/stats`

Должна появиться статистика заказов

---

## ЭТАП 1️⃣1️⃣: ДОБАВЛЕНИЕ МЕНЮ В БД

### Шаг 11.1: Открытие Prisma Studio

```bash
npx prisma studio
# Откроется на http://localhost:5555
```

### Шаг 11.2: Добавление товара

1. В левом меню выбери **"MenuItem"**
2. Нажми **"Add record"** и заполни:

```
name: Эспрессо
description: Классический двойной эспрессо
category: coffee
price: 120
bonusMultiplier: 1.0
available: true
weatherTag: [] (пусто)
timeOptimal: ["morning", "afternoon"]
```

3. Нажми **"Save"**
4. Повтори для других напитков

---

## ЭТАП 1️⃣2️⃣: ДОБАВЛЕНИЕ ВНЕШНИХ API КЛЮЧЕЙ (ОПЦИОНАЛЬНО)

### Шаг 12.1: OpenWeather (погода)

1. Перейди на https://openweathermap.org/api
2. Зарегистрируйся и получи API key
3. Добавь в .env.local:

```env
OPENWEATHER_KEY=your_key_here
```

### Шаг 12.2: OpenAI (AI рекомендации)

1. Перейди на https://platform.openai.com/api-keys
2. Создай новый ключ
3. Добавь в .env.local:

```env
OPENAI_KEY=sk-your_key_here
```

---

## 🎯 ПРОВЕРКА РАБОТОСПОСОБНОСТИ

После всех этапов проверь:

✅ Бот отвечает на `/start`
✅ Кнопка "☕ Открыть меню" открывает приложение
✅ Можно посмотреть меню
✅ Можно создать заказ
✅ `/stats` показывает статистику (если ты админ)
✅ Webhook работает (есть логи в Vercel)

---

## 🆘 TROUBLESHOOTING

### Проблема: "Webhook не работает"
**Решение:**
```bash
# Проверь URL webhook
curl https://api.telegram.org/bot{YOUR_TOKEN}/getWebhookInfo

# Если ошибка 404, установи заново:
curl -X POST https://api.telegram.org/bot{YOUR_TOKEN}/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourcoffee.vercel.app/api/telegram/webhook"}'
```

### Проблема: "База данных не подключается"
**Решение:**
```bash
# Проверь строку подключения в .env.local
# Убедись, что PostgreSQL запущен
# На Docker:
docker-compose ps
# Должно быть: yourcoffee_db - Up
```

### Проблема: "Переменные окружения не работают на Vercel"
**Решение:**
```bash
# Пересоздай деплой:
# На Vercel: Project Settings → Redeploy
```

### Проблема: "Mini App не открывается"
**Решение:**
1. Проверь URL в BotFather `/setmenu`
2. Убедись, что Vercel деплой успешен (green checkmark)
3. Обнови в браузере (Ctrl+Shift+R)

---

## 📱 ПЕРВЫЙ ЗАКАЗ

1. Открой своего бота в Telegram
2. Нажми `/start`
3. Нажми на кнопку "☕ Открыть меню"
4. Выбери напиток из меню
5. Добавь в корзину
6. Оформи заказ
7. Выбери способ оплаты (карта, наличные или бонусы)
8. Нажми "Заказать"
9. Получи QR-код для подтверждения

---

**ВСЁ! Твой бот готов работать! 🎉☕**

Если что-то не работает - проверь все шаги выше и логи в терминале.
