- Описание приложения:  
  Учебное веб‑приложение на React и TypeScript для хранения и управления кулинарными рецептами. Пользователь может просматривать рецепты,
  открывать страницу отдельного рецепта, а в дальнейшем – авторизоваться, добавлять свои рецепты, редактировать и удалять их.
  Публичного деплоя пока нет, проект запускается локально.

- Как получить исходники:  
  - git clone https://github.com/kislypolly/cookbook-app.git  
  - cd cookbook-app

- Требования:  
  - Node.js 20.x LTS или новее  
  - npm 10.x или новее  
  - Git  
  - React 18 + TypeScript  
  - Redux Toolkit, RTK Query  
  - React Router v6  
  - Supabase (PostgreSQL в облаке, Auth)  
  - Vite  
  - Установка зависимостей: npm install 

- Настройка окружения (.env.local):  
  - Создать файл .env.local в корне  
  - Добавить:  
    - VITE_SUPABASE_URL=https://your-project-id.supabase.co  
    - VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY  
  - Значения взять в Supabase: Project Settings , далее API (Project URL и anon public key), (например, https://pyaswecsvjgfzzfouvng.supabase.co, sb_publishable_EKxzDvI9ZIcqGdODJNLPsw_GnqdJl0c)

- Настройка базы данных в Supabase (минимум):  
  - Таблица recipes (id, user_id, title, description, image_url, ingredients, instructions, prep_time, cook_time, servings, difficulty, category, created_at)
                [
                  CREATE TABLE recipes (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
                    title TEXT NOT NULL,
                    description TEXT,
                    image_url TEXT,
                    ingredients TEXT[], -- ['мука', 'сахар']
                    instructions TEXT[],
                    prep_time TEXT DEFAULT '30 мин',
                    cook_time TEXT DEFAULT '1 час',
                    servings INTEGER DEFAULT 4,
                    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
                    category TEXT CHECK (category IN ('breakfast', 'lunch', 'dinner', 'dessert', 'snack')) DEFAULT 'lunch',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                  );
                  
                  CREATE TABLE favorites (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
                    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    UNIQUE(user_id, recipe_id)
                  );
                  
                  ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
                  CREATE POLICY "Public recipes read" ON recipes FOR SELECT USING (true);
                  CREATE POLICY "Users own recipes" ON recipes FOR ALL USING (auth.uid() = user_id);
                  
                  ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
                  CREATE POLICY "User favorites" ON favorites FOR ALL USING (auth.uid() = user_id);
            
                    DROP POLICY IF EXISTS "Public recipes read" ON recipes;
                    DROP POLICY IF EXISTS "Users can create own recipes" ON recipes;
                    DROP POLICY IF EXISTS "Users own recipes CRUD" ON recipes;
                    DROP POLICY IF EXISTS "Users create own recipes" ON recipes;
                    DROP POLICY IF EXISTS "Users update own recipes" ON recipes;
                    DROP POLICY IF EXISTS "Users delete own recipes" ON recipes;
                    
                    ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
                    
                    CREATE POLICY "Public recipes read" ON recipes FOR SELECT USING (true);
                    CREATE POLICY "Users create own recipes" ON recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
                    CREATE POLICY "Users update own recipes" ON recipes FOR UPDATE USING (auth.uid() = user_id);
                    CREATE POLICY "Users delete own recipes" ON recipes FOR DELETE USING (auth.uid() = user_id);
            ]
  - Таблица favorites (user_id, recipe_id)  
  - Политики RLS: пользователь видит все рецепты, редактирует/удаляет только свои

- Запуск проекта (по умолчанию *nix / macOS / Linux):  
  - Установка зависимостей: npm install  
  - Запуск dev-сервера: npm run dev  
  - Открыть приложение: http://localhost:3023
  - Production-сборка: npm run build  
  - Предпросмотр production-сборки: npm run preview 

- Главный бизнес-кейс (как планируется):  
  - Зарегистрироваться / войти через Supabase Auth  
  - Создать рецепт: загрузить фото, получить AI-подсказку с ингредиентами и шагами, отредактировать и сохранить  
  - Открыть страницу рецепта, посмотреть детали  
  - Добавить рецепт в избранное  
  - Перейти в профиль и увидеть свои избранные рецепты

- Текущий главный кейс (что уже есть):  
  - Запустить приложение локально  
  - Открыть главную страницу и увидеть список рецептов (по мере настройки Supabase/RTK Query)  
  - Перейти на страницу конкретного рецепта и посмотреть детали

- Структура приложения (основные директории):  
  - src/components – переиспользуемые визуальные компоненты (карточки, формы, кнопки и т.п.)  
  - src/pages – страницы приложения (главная, RecipePage, страницы создания/редактирования, профиль)
  - src/store  
    - index.ts – конфигурация Redux store, подключение auth, recipes и recipeApi   
    - recipeSlice.ts – слайс рецептов: items, loading, error, currentRecipe + createAsyncThunk для fetchRecipes, updateRecipe, deleteRecipe (Supabase)   
    - authSlice.ts – слайс авторизации (user)   
    - api.ts – RTK Query эндпоинты для запросов к Supabase (CRUD и избранное)
  - src/hooks – кастомные хуки (useAuth с Supabase Auth)
  - src/lib – вспомогательные модули (supabase.ts – инициализация клиента)   
  - src/styles – стили и адаптивная верстка

- Статус и что будет доделано к 31.12:  
  - Завершить формы создания/редактирования рецепта и связать их с Supabase
  - Добавить AI-подсказку по фото (клиент к AI-API, автозаполнение формы)  
  - Настроить деплой на GitHub Pages (скрипт deploy и настройка Pages)   
  - Добавить unit-тесты (Jest + React Testing Library) для слайсов и ключевых функций  
  - Настроить Storybook и скриншотные тесты для основных компонентов  
  - Написать 1–2 E2E-теста (Cypress/Playwright) для ключевых сценариев  
  - Дочистить адаптивность и UX, убрать временные заглушки и отладочный код
