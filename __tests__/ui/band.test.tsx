import { render, screen } from '@testing-library/react';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import Band from '@/pages/bands/[bandId]';

test('band component displays correct band information', async () => {
  const { fakeBands } = await readFakeData();

  render(<Band error={null} band={fakeBands[0]} />);

  const heading = screen.getByRole('heading', {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();

  // more tests here...
});

test('band component displays error', async () => {
  render(<Band error='EVERYTHING IS FINE' band={null} />);

  const heading = screen.getByRole('heading', { name: /everything is fine/i });
  expect(heading).toBeInTheDocument();
});
