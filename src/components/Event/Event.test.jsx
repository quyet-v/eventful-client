import React from 'react';
import { render } from '@testing-library/react';
import Event from './Event';

describe('Event test', () => {
  it('event should display correct name and host', () => {
    const event = {
      name: 'party',
      host: 'john',
    };
    const { getByTestId } = render(<Event event={event} />);

    const eventName = getByTestId('event-name').textContent;
    const eventHost = getByTestId('event-host').textContent;

    expect(eventName).toEqual('party');
    expect(eventHost).toEqual('Hosted by john');
  });

  it('event options should appear when options button is clicked', () => {
    const event = {
      name: 'party',
      host: 'john',
    };
    const { getByTestId } = render(<Event event={event} id={1} active={1} />);
    const optionsContainer = getByTestId('options-container');

    expect(optionsContainer).toBeTruthy();
  });
});
