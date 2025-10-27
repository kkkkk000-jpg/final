import { test, expect } from '@playwright/test';

test.describe('Advanced API Tests', () => {
  test('Authentication with Bearer token', async ({ request }) => {
    // Пример с авторизацией через Bearer token
    const response = await request.get('https://httpbin.org/bearer', {
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.authenticated).toBe(true);

    console.log('Auth response:', data);
  });

  test('Form data submission', async ({ request }) => {
    // POST запрос с form data
    const formData = new URLSearchParams();
    formData.append('username', 'testuser');
    formData.append('password', 'testpass');
    formData.append('email', 'test@example.com');

    const response = await request.post('https://httpbin.org/post', {
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.form.username).toBe('testuser');
    expect(data.form.password).toBe('testpass');

    console.log('Form data response:', data);
  });

  test('File upload simulation', async ({ request }) => {
    // Симуляция загрузки файла
    const fileContent = 'This is test file content';
    const fileName = 'test.txt';

    const response = await request.post('https://httpbin.org/post', {
      multipart: {
        file: {
          name: fileName,
          mimeType: 'text/plain',
          buffer: Buffer.from(fileContent),
        },
        description: 'Test file upload',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.files[fileName]).toBe(fileContent);

    console.log('File upload response:', data);
  });

  test('API with retry logic', async ({ request }) => {
    // Тест с повторными попытками
    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      try {
        const response = await request.get('https://httpbin.org/status/200');

        if (response.status() === 200) {
          success = true;
          console.log(`Success on attempt ${attempts + 1}`);
        }
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} failed:`, error);

        if (attempts < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        }
      }
    }

    expect(success).toBe(true);
  });

  test('Concurrent API requests', async ({ request }) => {
    // Параллельные запросы
    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2',
      'https://jsonplaceholder.typicode.com/posts/3',
    ];

    // Выполняем все запросы параллельно
    const responses = await Promise.all(urls.map((url) => request.get(url)));

    // Проверяем все ответы
    responses.forEach((response, index) => {
      expect(response.status()).toBe(200);
      console.log(`Response ${index + 1} status: ${response.status()}`);
    });

    // Получаем данные из всех ответов
    const allData = await Promise.all(
      responses.map((response) => response.json())
    );

    expect(allData).toHaveLength(3);
    expect(allData[0].id).toBe(1);
    expect(allData[1].id).toBe(2);
    expect(allData[2].id).toBe(3);

    console.log('All posts:', allData);
  });

  test('API response validation with schema', async ({ request }) => {
    // Валидация структуры ответа
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    // Проверяем обязательные поля
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('website');
    expect(user).toHaveProperty('company');

    // Проверяем типы данных
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.address).toBe('object');
    expect(typeof user.company).toBe('object');

    // Проверяем email формат
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    console.log('Validated user:', user);
  });

  test('API rate limiting test', async ({ request }) => {
    // Тест на ограничение скорости запросов
    const requests: Promise<any>[] = [];

    // Отправляем 10 запросов подряд
    for (let i = 0; i < 10; i++) {
      requests.push(request.get('https://httpbin.org/get'));
    }

    const responses = await Promise.all(requests);

    // Проверяем, что все запросы прошли успешно
    responses.forEach((response, index) => {
      expect(response.status()).toBe(200);
      console.log(`Request ${index + 1} status: ${response.status()}`);
    });

    console.log(`All ${responses.length} requests completed successfully`);
  });
});
