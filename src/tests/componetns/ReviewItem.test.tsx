import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from "vitest"
import { render, screen } from '@testing-library/react';
import type { Review } from '../../entities/review/interface';
import { ReviewItem } from '../../entities/review/ReviewItem';

describe('ReviewItem', () => {
    it('should render review content', () => {
        const review: Review = {
            id: 'r1',
            comment: 'Great place!',
            date: '2025-10-10T00:00:00.000Z',
            rating: 4,
            user: { name: 'Alice', avatarUrl: '/img/alice.png' },
        } as Review;

        render(<ReviewItem review={review} />);

        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Great place!')).toBeInTheDocument();
        expect(screen.getByText(/October 2025/i)).toBeInTheDocument();
    })
})