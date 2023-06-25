import React from 'react';

import { normalizeInstance } from 'soapbox/normalizers';

import { fireEvent, render, screen } from '../../../../jest/test-helpers';
import LoginForm from '../login_form';

describe('<LoginForm />', () => {
  it('renders for Pleroma', () => {
    const mockFn = jest.fn();
    const store = {
      instance: normalizeInstance({
        version: '2.7.2 (compatible; Pleroma 2.3.0)',
      }),
    };

    render(<LoginForm handleSubmit={mockFn} isLoading={false} />, undefined, store);

    expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);
  });

  it('renders for Mastodon', () => {
    const mockFn = jest.fn();
    const store = {
      instance: normalizeInstance({
        version: '3.0.0',
      }),
    };

    render(<LoginForm handleSubmit={mockFn} isLoading={false} />, undefined, store);

    expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);
  });

  it('responds to the handleSubmit prop', () => {
    const mockFn = jest.fn();
    render(<LoginForm handleSubmit={mockFn} isLoading={false} />);
    fireEvent.submit(screen.getByTestId(/button/i));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
