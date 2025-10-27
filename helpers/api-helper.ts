import { APIRequestContext, expect } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  // Генерация случайного email
  generateRandomEmail(): string {
    return `test${Date.now()}${Math.floor(Math.random() * 1000)}@test.com`;
  }

  // Генерация случайного имени
  generateRandomName(): string {
    const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana'];
    const surnames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomName} ${randomSurname}`;
  }

  // Проверка статуса ответа
  async checkResponseStatus(response: any, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  // Проверка заголовков
  async checkContentType(response: any, expectedType: string) {
    expect(response.headers()['content-type']).toContain(expectedType);
  }

  // Проверка времени ответа
  async checkResponseTime(response: any, maxTime: number = 5000) {
    const responseTime =
      response.request().timing().responseEnd -
      response.request().timing().requestStart;
    expect(responseTime).toBeLessThan(maxTime);
  }

  // Универсальный GET запрос
  async get(url: string, headers?: Record<string, string>) {
    return await this.request.get(url, { headers });
  }

  // Универсальный POST запрос
  async post(url: string, data?: any, headers?: Record<string, string>) {
    return await this.request.post(url, {
      data,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  }

  // Универсальный PUT запрос
  async put(url: string, data?: any, headers?: Record<string, string>) {
    return await this.request.put(url, {
      data,
      headers: { 'Content-Type': 'application/json', ...headers },
    });
  }

  // Универсальный DELETE запрос
  async delete(url: string, headers?: Record<string, string>) {
    return await this.request.delete(url, { headers });
  }

  // Проверка JSON схемы
  async validateJsonSchema(data: any, schema: any) {
    // Простая валидация - проверяем наличие обязательных полей
    for (const field of schema.required) {
      expect(data).toHaveProperty(field);
    }
  }

  // Retry логика
  async retryRequest(requestFn: () => Promise<any>, maxRetries: number = 3) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
      }
    }

    throw lastError;
  }
}
