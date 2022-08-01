import { testApiHandler } from 'next-test-api-route-handler';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import showsIdHandler from '@/pages/api/shows/[showId]';
import showsHandler from '@/pages/api/shows/index';

test('GET /api/shows returns shows from database', async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();

      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

test('GET /api/show/[showId] returns the data for the correct show ID', async () => {
  await testApiHandler({
    handler: showsIdHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ methode: 'GET' });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});
