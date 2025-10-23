import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Map } from '../../components/Map';
import { SortOptions } from '../../features/offer/sort/SortOptions';
import type { SortType } from '../../features/offer/sort/SortOptions';
import { Spinner } from '../../shared/ui/Spinner';
import { MainEmptyPage } from './empty';
import { useAppDispatch, useAppSelector } from '../../shared/lib/store/redux';
import { changeCity, resetCityChanged } from '../../entities/city';
import { CitiesList } from '../../features/city/list';
import { OffersList } from '../../widgets/offers/OffersList';
import type { Offer } from '../../entities/offer';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];


export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const cityCoords = useAppSelector((state) => state.city.coords);
  const cityChanged = useAppSelector((state) => state.city.cityChanged);
  const offers = useAppSelector((state) => state.offers.items);
  const isLoading = useAppSelector((state) => state.offers.isOffersLoading);
  const error = useAppSelector((state) => state.offers.error);

  const [sort, setSort] = useState<SortType>('Popular');
  const handleSortChange = useCallback((newSort: SortType) => {
    setSort(newSort);
  }, []);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filteredOffers = useMemo(
    () => offers.filter((offer: Offer) => offer.city.name === city.name),
    [offers, city]
  );

  const sortedOffers = useMemo(() => {
    switch (sort) {
      case 'Price: low to high':
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }, [filteredOffers, sort]);

  const handleCityClick = useCallback((selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  }, [dispatch]);

  useEffect(() => {
    if (cityChanged) {
      dispatch(resetCityChanged());
    }
  }, [cityChanged, dispatch])

  // возможно, при ошибке нужно показывать другую страницу
  if ((!isLoading && filteredOffers.length === 0) || error) {
    return <MainEmptyPage />;
  }

  // const [fakeLoading, setFakeLoading] = useState(true);
  // React.useEffect(() => {
  //   const timer = setTimeout(() => setFakeLoading(false), 5000000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                cities={CITIES}
                activeCity={city.name}
                onCityClick={handleCityClick}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
                <SortOptions activeSort={sort} onSortChange={handleSortChange} />

                {isLoading /*|| fakeLoading */ ? (
                  <div><Spinner /></div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <OffersList offers={sortedOffers} onCardHover={setActiveOfferId} />
                )}

              </section>
              <section className="cities__map map" style={{ width: '45%' }}>
                <Map offers={filteredOffers} activeOfferId={activeOfferId} center={cityCoords} cityChanged={cityChanged} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};