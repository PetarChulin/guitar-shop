import React from 'react';
import { render, screen } from '@testing-library/react';
import Unathorized from './unauthorized.component';

test('renders the right text in tag', () => {
    render(<Unathorized />);
    const h2 = screen.getByText('You are not authorized to view this page!');
    expect(h2).toBeInTheDocument();
  });