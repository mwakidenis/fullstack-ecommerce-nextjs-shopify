import { render, screen } from '@testing-library/react';
import Hello from '@/components/Hello';

describe('Hello Component', () => {
  it('renders the correct name', () => {
    render(<Hello name="Next.js" />);
    const heading = screen.getByText(/hello, next\.js!/i);
    expect(heading).toBeInTheDocument();
  });
});