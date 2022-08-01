// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// polyfill necessary for jsdom test environment
import { TextDecoder, TextEncoder } from 'util';

import { resetDB } from './__tests__/__mocks__/db/utils/reset-db';
import { server } from './__tests__/__mocks__/msw/server';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => server.listen());

beforeEach(async () => {
  await resetDB();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
