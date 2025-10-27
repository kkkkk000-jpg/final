import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET request - fetch user data', async ({ request }) => {
    // Простой GET запрос
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    // Проверяем статус код
    expect(response.status()).toBe(200);

    // Проверяем заголовки
    expect(response.headers()['content-type']).toContain('application/json');

    // Получаем данные и проверяем их
    const userData = await response.json();
    expect(userData.id).toBe(1);
    expect(userData.name).toBeTruthy();
    expect(userData.email).toContain('@');

    console.log('User data:', userData);
  });

  test('POST request - create new post', async ({ request }) => {
    // POST запрос с данными
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1,
    };

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: newPost,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Проверяем статус код
    expect(response.status()).toBe(201);

    // Проверяем ответ
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeTruthy(); // ID должен быть сгенерирован

    console.log('Created post:', createdPost);
  });

  test('PUT request - update existing post', async ({ request }) => {
    // PUT запрос для обновления
    const updatedPost = {
      id: 1,
      title: 'Updated Post Title',
      body: 'This post has been updated by Playwright',
      userId: 1,
    };

    const response = await request.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        data: updatedPost,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Проверяем статус код
    expect(response.status()).toBe(200);

    // Проверяем обновленные данные
    const result = await response.json();
    expect(result.title).toBe(updatedPost.title);
    expect(result.body).toBe(updatedPost.body);

    console.log('Updated post:', result);
  });

  test('DELETE request - delete post', async ({ request }) => {
    // DELETE запрос
    const response = await request.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    // Проверяем статус код
    expect(response.status()).toBe(200);

    // Для DELETE запроса обычно возвращается пустой объект или подтверждение
    const result = await response.json();
    console.log('Delete response:', result);
  });

  test('Error handling - 404 Not Found', async ({ request }) => {
    // Тест обработки ошибок
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/99999'
    );

    // Проверяем, что получили 404
    expect(response.status()).toBe(404);

    console.log('404 response status:', response.status());
  });

  test('Request with custom headers', async ({ request }) => {
    // Запрос с кастомными заголовками
    const response = await request.get('https://httpbin.org/headers', {
      headers: {
        'X-Custom-Header': 'Playwright-Test',
        'User-Agent': 'Playwright-API-Test',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.headers['X-Custom-Header']).toBe('Playwright-Test');
    expect(data.headers['User-Agent']).toBe('Playwright-API-Test');

    console.log('Custom headers response:', data);
  });

  test('Query parameters', async ({ request }) => {
    // GET запрос с query параметрами
    const response = await request.get('https://httpbin.org/get', {
      params: {
        param1: 'value1',
        param2: 'value2',
        test: 'playwright',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.args.param1).toBe('value1');
    expect(data.args.param2).toBe('value2');
    expect(data.args.test).toBe('playwright');

    console.log('Query params response:', data);
  });

  test('Response time validation', async ({ request }) => {
    // Проверка времени ответа
    const startTime = Date.now();

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000); // Ответ должен быть быстрее 5 секунд

    console.log(`Response time: ${responseTime}ms`);
  });
});
