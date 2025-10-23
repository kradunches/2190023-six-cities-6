import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from "vitest"
import { render, screen, within } from '@testing-library/react';
import type { Review } from '../../entities/review/interface';
import { ReviewList } from '../../components/ReviewList';

describe('ReviewList', () => {
    it('should render title and number of reviews', () => {
        const reviews: Review[] = [
            {
                id: 'r1',
                comment: 'Nice',
                date: '2025-10-10T00:00:00.000Z',
                rating: 4,
                user: { name: 'Bob', avatarUrl: '/img/bob.png', isPro: false },
            },
            {
                id: 'r2',
                comment: 'Good',
                date: '2025-10-09T00:00:00.000Z',
                rating: 5,
                user: { name: 'Sasha', avatarUrl: '/img/sasha.png', isPro: true },
            },
        ];

        render(<ReviewList reviews={reviews} />);

        const heading = screen.getByText(/reviews/i);
        expect(heading).toBeInTheDocument();
        expect(within(heading).getByText(/reviews/i)).toBeInTheDocument();
        expect(within(heading).getByText('2')).toBeInTheDocument();

        const items = screen.getAllByRole('listitem');
        expect(items.length).toBe(2);
    });
})