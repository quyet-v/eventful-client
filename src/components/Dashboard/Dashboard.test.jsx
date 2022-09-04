import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

describe('Dashboard test', () => {
  it('dashboard component should render', () => {
    const dashboard = render(<Dashboard />);

    expect(dashboard).toBeInTheDocument();
  });
});
