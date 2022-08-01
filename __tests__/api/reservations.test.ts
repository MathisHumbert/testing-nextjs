import { testApiHandler } from 'next-test-api-route-handler';

import { validateToken } from '@/lib/auth/utils';
import reservationHandler from '@/pages/api/reservations/[reservationId]';
import userReservationHandler from '@/pages/api/users/[userId]/reservations';

jest.mock('@/lib/auth/utils');
const mockValidateToken = validateToken as jest.Mock;

test('POST /api/reservations/[reservationsId] creates a reservation', async () => {
  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          showId: 0,
          userId: 1,
          seatCount: 5,
        }),
      });
      expect(res.status).toEqual(201);
    },
  });

  await testApiHandler({
    handler: userReservationHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toEqual(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
    },
  });
});

test('POST /api/reservations/[reservationId] return 401 status when not authorized', async () => {
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          showId: 0,
          userId: 1,
          seatCount: 5,
        }),
      });
      expect(res.status).toEqual(401);
    },
  });
});
