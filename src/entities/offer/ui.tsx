import React from 'react';
import { Link, useNavigate } from 'react-router';
import type { Offer } from '../interface';

import { AuthorizationStatus } from '../../auth/model/slice';
import { changeFavoriteStatus } from '../store/offer-thunks';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/store/redux';

type PlaceCardProps = {
    offer: Offer;
    cardClassName?: string;
    imageWrapperClassName?: string;
    onHover?: (id: string | null) => void;
};

export const PlaceCard: React.FC<PlaceCardProps> = React.memo(({
    offer,
    cardClassName = 'cities__card',
    imageWrapperClassName = 'cities__image-wrapper',
    onHover
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthorized = useAppSelector((state) => state.auth.authorizationStatus) === AuthorizationStatus.Authorized;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isAuthorized) {
            navigate('/login');
            return;
        }
        dispatch(changeFavoriteStatus({
            offerId: offer.id,
            status: offer.isFavorite ? 0 : 1
        }));
    }

    return (
        <article
            className={`${cardClassName} place-card`}
            onMouseEnter={() => onHover?.(offer.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            {offer.isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
                <Link to={`/offer/${offer.id}`}>
                    <img
                        className="place-card__image"
                        src={offer.previewImage}
                        width="260"
                        height="200"
                        alt={offer.title}
                    />
                </Link>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{offer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button
                        className={`place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`}
                        type="button"
                        onClick={handleFavoriteClick}
                    >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                            {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${offer.rating * 20}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
                </h2>
                <p className="place-card__type">{offer.type}</p>
            </div>
        </article>
    );
});