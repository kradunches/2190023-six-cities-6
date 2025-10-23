import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react';
import { OffersFavoritesList } from "../../widgets/offers/favorites/OffersFavoritesList";
import type { Offer } from '../../entities/offer/interface';
import { NearbyOffersList } from '../../components/NearbyOffersList';

vi.mock('../../components/PlaceCard', () => ({
    PlaceCard: ({ offer }: { offer: Offer }) => <div data-testid="place-card">{offer.title ?? offer.id}</div>,
}));

describe('FavoriteList', () => {
    it('should render list of favorite offers', () => {
        const offers: Offer[] = [
            { id: '1', title: 'Fav 1' },
            { id: '2', title: 'Fav 2' },
        ] as Offer[];

        render(<OffersFavoritesList offers={offers} />);

        const cards = screen.getAllByTestId('place-card');
        expect(cards).toHaveLength(2);
        expect(cards[0]).toHaveTextContent('Fav 1');
        expect(cards[1]).toHaveTextContent('Fav 2');
    });
});

describe('NearbyOffersList', () => {
    it('should render list of nearby offers', () => {
        const offers: Offer[] = [
            { id: 'n1', title: 'Nearby 1' },
            { id: 'n2', title: 'Nearby 2' },
            { id: 'n3', title: 'Nearby 3' },
        ] as Offer[];

        render(<NearbyOffersList offers={offers} />);

        const cards = screen.getAllByTestId('place-card');
        expect(cards).toHaveLength(3);
        expect(cards[0]).toHaveTextContent('Nearby 1');
    });
});