# API Testing with Playwright

Этот проект содержит примеры API тестирования с использованием Playwright.

## Структура файлов

### Основные тесты
- `tests/api-tests.spec.ts` - Базовые API тесты (GET, POST, PUT, DELETE)
- `tests/advanced-api-tests.spec.ts` - Продвинутые API тесты (авторизация, файлы, параллельные запросы)
- `tests/api-with-helper.spec.ts` - Примеры использования helper класса

### Утилиты
- `helpers/api-helper.ts` - Класс с утилитами для API тестирования

## Запуск тестов

```bash
# Запустить все API тесты
npx playwright test tests/api-tests.spec.ts

# Запустить продвинутые тесты
npx playwright test tests/advanced-api-tests.spec.ts

# Запустить тесты с helper
npx playwright test tests/api-with-helper.spec.ts

# Запустить все тесты
npx playwright test
```

## Примеры использования

### 1. Простой GET запрос
```typescript
test('GET request', async ({ request }) => {
  const response = await request.get('https://api.example.com/users/1');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.id).toBe(1);
});
```

### 2. POST запрос с данными
```typescript
test('POST request', async ({ request }) => {
  const newUser = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  const response = await request.post('https://api.example.com/users', {
    data: newUser,
    headers: { 'Content-Type': 'application/json' }
  });

  expect(response.status()).toBe(201);
});
```

### 3. Использование helper класса
```typescript
test('With helper', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  
  const randomEmail = apiHelper.generateRandomEmail();
  const response = await apiHelper.post('/users', { email: randomEmail });
  
  await apiHelper.checkResponseStatus(response, 201);
});
```

## Основные возможности

### HTTP методы
- ✅ GET - получение данных
- ✅ POST - создание данных
- ✅ PUT - обновление данных
- ✅ DELETE - удаление данных
- ✅ PATCH - частичное обновление

### Проверки
- ✅ Статус коды ответов
- ✅ Заголовки
- ✅ Время ответа
- ✅ Структура JSON
- ✅ Валидация данных

### Дополнительные возможности
- ✅ Авторизация (Bearer token)
- ✅ Загрузка файлов
- ✅ Form data
- ✅ Query параметры
- ✅ Retry логика
- ✅ Параллельные запросы
- ✅ Генерация тестовых данных

## Полезные API для тестирования

- **JSONPlaceholder** - `https://jsonplaceholder.typicode.com/` - REST API для тестирования
- **HTTPBin** - `https://httpbin.org/` - HTTP тестирование и отладка
- **ReqRes** - `https://reqres.in/` - Fake REST API
- **Postman Echo** - `https://postman-echo.com/` - Тестирование запросов

## Советы

1. **Используйте реальные API** для более реалистичного тестирования
2. **Добавляйте проверки времени ответа** для производительности
3. **Используйте retry логику** для нестабильных API
4. **Генерируйте уникальные данные** для избежания конфликтов
5. **Проверяйте не только успешные сценарии**, но и ошибки (404, 500, etc.)
