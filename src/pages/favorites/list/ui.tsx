import React from 'react';
import { FavoritesEmptyPage } from '../empty/ui';
import { OffersFavoritesList } from '../../../widgets/offers/favorites/OffersFavoritesList';
import { useAppSelector } from '../../../shared/lib/store/redux';

export const FavoritesPage: React.FC = () => {
    const offers = useAppSelector((state) => state.offers.items);
    const favoriteOffers = offers.filter((offer) => offer.isFavorite);

    if (favoriteOffers.length === 0) {
        return <FavoritesEmptyPage />
    }

    return (
        <>
            <div className="page">
                <main className="page__main page__main--favorites">
                    <div className="page__favorites-container container">
                        <section className="favorites">
                            <h1 className="favorites__title">Saved listing</h1>
                            <OffersFavoritesList offers={favoriteOffers} />
                        </section>
                    </div>
                </main>
                <footer className="footer container">
                    <a className="footer__logo-link" href="main.html">
                        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
                    </a>
                </footer>
            </div>
        </>
    );
}