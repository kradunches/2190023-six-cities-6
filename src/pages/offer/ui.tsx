import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router';
import { fetchOffer, fetchNearbyOffers, fetchReviews, changeFavoriteStatus } from '../../store/offer-thunks';
import { AuthorizationStatus } from '../../entities/auth/model/slice';
import { ReviewList } from '../../components/ReviewList';
import { Spinner } from '../../shared/ui/Spinner';
import { CommentForm } from '../../features/review/form/ui';
import { NearbyOffersSection } from '../../widgets/offers/nearby/section/NearbyOffersSection';
import { useAppDispatch, useAppSelector } from '../../shared/lib/store/redux';
// import { NearbyOffersList } from '../components/NearbyOffersList';

export const OfferPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const offer = useAppSelector((state) => state.offers.currentOffer);
  const reviews = useAppSelector((state) => state.offers.reviews);
  const isOfferLoading = useAppSelector((state) => state.offers.isOfferLoading);
  const error = useAppSelector((state) => state.offers.error);

  const isAuthorized = useAppSelector((state) => state.auth.authorizationStatus === AuthorizationStatus.Authorized)

  // const [fakeLoading, setFakeLoading] = React.useState(true);
  // React.useEffect(() => {
  //   const timer = setTimeout(() => setFakeLoading(false), 5000000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      navigate('/login');
      return;
    }
    if (!offer?.id) {
      return;
    }
    dispatch(changeFavoriteStatus({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  }

  if (isOfferLoading /*|| fakeLoading*/) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
      <Spinner />
    </div>;
  }

  if (!isOfferLoading && error) {
    // console.log('error: ', error);
    // console.log('isOfferLoading: ', isOfferLoading);
    // console.log('offer: ', offer);
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer?.images?.map((img, i) => (

                <div className="offer__image-wrapper" key={i}>
                  <img className="offer__image" src={img} alt={offer?.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer?.title}
                </h1>
                <button className={`offer__bookmark-button button${offer?.isFavorite ? ' offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer?.rating ?? 0) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer?.bedrooms} {offer?.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer?.maxAdults} {offer?.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer?.goods?.map((good, i) => (
                    <li className="offer__inside-item" key={i}>
                      {good}
                    </li>
                  ))}

                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                {offer?.host && (
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                )}
                <div className="offer__description">
                  <p className="offer__text">
                    {offer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews} />
                {isAuthorized && (
                  <CommentForm offerId={id!} />
                )}
              </section>
            </div>
          </div>
          {/* <section className="offer__map map" style={{ margin: "20px auto", width: "40%" }}>
            <Map offers={nearbyOffers} activeOfferId={activeOfferId} />
          </section> */}
        </section>
        {/* <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffersList offers={nearbyOffers} onHover={setActiveOfferId} />
          </section>
        </div> */}
        {/* кастомная разметка для более красивого отображения nearby offers и карты */}
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <NearbyOffersSection />
      </main>
    </div>
  );
};