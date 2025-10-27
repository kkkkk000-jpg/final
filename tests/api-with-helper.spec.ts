import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/api-helper';

test.describe('API Tests with Helper', () => {
  test('Simple GET test with helper', async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    const response = await apiHelper.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    await apiHelper.checkResponseStatus(response, 200);
    await apiHelper.checkContentType(response, 'application/json');

    const userData = await response.json();
    expect(userData.id).toBe(1);

    console.log('User data:', userData);
  });

  test('POST test with random data', async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    const randomName = apiHelper.generateRandomName();
    const randomEmail = apiHelper.generateRandomEmail();

    const newUser = {
      name: randomName,
      email: randomEmail,
      username: randomName.toLowerCase().replace(' ', ''),
      phone: '555-1234',
    };

    const response = await apiHelper.post(
      'https://jsonplaceholder.typicode.com/users',
      newUser
    );

    await apiHelper.checkResponseStatus(response, 201);

    const createdUser = await response.json();
    expect(createdUser.name).toBe(randomName);
    expect(createdUser.email).toBe(randomEmail);

    console.log('Created user:', createdUser);
  });

  test('API test with retry logic', async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    const response = await apiHelper.retryRequest(async () => {
      return await apiHelper.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
    });

    await apiHelper.checkResponseStatus(response, 200);

    const post = await response.json();
    expect(post.id).toBe(1);

    console.log('Post with retry:', post);
  });

  test('Response time validation', async ({ request }) => {
    const apiHelper = new ApiHelper(request);

    const response = await apiHelper.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    await apiHelper.checkResponseStatus(response, 200);
    await apiHelper.checkResponseTime(response, 3000); // Max 3 seconds

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);

    console.log(`Received ${posts.length} posts`);
  });
});
