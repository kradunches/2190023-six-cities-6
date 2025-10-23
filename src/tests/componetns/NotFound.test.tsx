import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from "vitest"
import { render, screen } from '@testing-library/react';
import { NotFound } from '../../pages/notfound/NotFound';

describe('NotFound', () => {
    it('should render 404 message and link', () => {
        render(<NotFound />);
        expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
        const link = screen.getByRole('link', { name: /go to main page/i });
        expect(link).toHaveAttribute('href', '/');;
    });
});