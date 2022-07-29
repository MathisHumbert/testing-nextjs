import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

import { readFakeData } from '../../fakeData';

export const resetDB = async () => {
  // failsafe against resetting production db!
  const safeToReset = process.env.NODE_ENV === 'test';

  if (!safeToReset) {
    // eslint-disable-next-line no-console
    console.log('WARNING: database reset unvailable outside test environment');
    return;
  }

  const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
    await readFakeData();

  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};
