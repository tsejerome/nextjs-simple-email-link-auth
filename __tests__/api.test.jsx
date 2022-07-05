import testRoute from '../pages/api/test';
import { createMocks } from 'node-mocks-http';

describe('/test route', () => {
  it('Success Case', async() => {
    const { req, res } = createMocks({
      method: 'GET',
      params: {
        test: 'dog',
      },
    });

    await testRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
  })
})