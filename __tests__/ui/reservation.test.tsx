import { render, screen } from '@testing-library/react';

import { Reservation } from '@/components/reservations/Reservation';

test('reservation page show correct number of available seats', async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test('reservation page shows sold out message and No purchase button if there are no seats available', async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);
  const soldtOutMessage = await screen.findByRole('heading', {
    name: /sold out/i,
  });
  expect(soldtOutMessage).toBeInTheDocument();

  const purchaseButton = screen.queryByRole('button', { name: /purchase/i });
  expect(purchaseButton).not.toBeInTheDocument();
});
