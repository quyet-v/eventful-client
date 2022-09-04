import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FriendControls from './FriendControls';
import '@testing-library/jest-dom';

describe('FriendControls test', () => {
  it('requests should appear when user hover over requests button', async () => {
    const { getByTestId, getByText } = render(<FriendControls />);
    const bellButton = getByTestId('bell-button');
    fireEvent.mouseOver(bellButton);
    await waitFor(() => getByText('Requests'));
    expect(getByText('Requests')).toBeInTheDocument();
  });

  it('requests should appear when user hover over requests button', async () => {
    const { getByTestId, getByText } = render(<FriendControls />);
    const friendsButton = getByTestId('friends-button');
    fireEvent.mouseOver(friendsButton);
    await waitFor(() => getByText('Friends'));
    expect(getByText('Friends')).toBeInTheDocument();
  });
});
