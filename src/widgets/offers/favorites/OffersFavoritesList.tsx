import React from 'react';
import type { Offer } from '../../../entities/offer/interface';
import { PlaceCard } from '../entities/offer/ui/PlaceCard';

type FavoritesListProps = {
  offers: Offer[];
};

export const OffersFavoritesList: React.FC<FavoritesListProps> = ({ offers }) => (
  <ul className="favorites__list places__list">
    {offers.map((offer) => (
      <li className="favorites__locations-items" key={offer.id}>
        <PlaceCard
          offer={offer}
          cardClassName="favorites__card"
          imageWrapperClassName="favorites__image-wrapper"
        />
      </li>
    ))}
  </ul>
);