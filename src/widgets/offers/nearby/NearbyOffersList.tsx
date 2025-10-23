import React from 'react';
import type { Offer } from '../entities/offer/interface';
import { PlaceCard } from '../entities/offer/ui/PlaceCard';

type NearbyOffersListProps = {
    offers: Offer[];
    onCardHover?: (offerId: string | null) => void;
};

export const NearbyOffersList: React.FC<NearbyOffersListProps> = ({ offers, onCardHover }) => {

    const handleCardHover = (id: string | null) => {
        onCardHover?.(id);
    }

    return (
        <div className="near-places__list places__list">
            {offers.map((offer) => (
                <PlaceCard
                    key={offer.id}
                    offer={offer}
                    cardClassName="near-places__card"
                    imageWrapperClassName="near-places__image-wrapper"
                    onHover={handleCardHover}
                />
            ))}
        </div>
    );
};