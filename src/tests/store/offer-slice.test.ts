import { describe, it, expect } from 'vitest';
import offersReducer, { type OffersState } from '../../store/offer-slice';
import {
    fetchOffers,
    fetchOffer,
    fetchNearbyOffers,
    fetchReviews,
    fetchFavorites,
    changeFavoriteStatus,
} from '../../store/offer-thunks';

import { clearFavorites } from '../../store/action';
import type { Offer } from '../../entities/offer/interface';
import type { Review } from '../../entities/review/interface';

const makeOffer = (id: string, isFavorite = false): Offer => ({
    id,
    isFavorite,
    title: `Offer ${id}`,
} as Offer);

const makeReview = (id: string): Review => ({
    id,
    comment: `Review ${id}`,
    rating: 5
} as Review);

describe('offerSlice reducer', () => {
    const initialState: OffersState = {
        items: [],
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        isOffersLoading: false,
        isOfferLoading: false,
        error: null,
    };

    it('should return initial state', () => {
        expect(offersReducer(undefined, { type: '' })).toEqual(initialState);
    });

    //fetchOffers
    it('should hanlde fetchOffers.pending (set loading and clear error)', () => {
        const next = offersReducer(initialState, fetchOffers.pending('', undefined));
        expect(next.isOffersLoading).toBe(true);
        expect(next.error).toBeNull();
    });

    it('should handle fetchOffers.fulfilled (save itema and stop loading)', () => {
        const payload = [makeOffer('1'), makeOffer('2')];
        const prev = { ...initialState, isOffersLoading: true };
        const next = offersReducer(prev, fetchOffers.fulfilled(payload, '', undefined));
        expect(next.isOfferLoading).toBe(false);
        expect(next.items).toEqual(payload);
        expect(next.error).toBeNull();
    });

    it('should handle fetchOffers.rejected (stop loading and set error)', () => {
        const prev = { ...initialState, isOffersLoading: true };
        const errMsg = 'Failed to fetch offers';
        const next = offersReducer(
            prev,
            fetchOffers.rejected(new Error('err'), '', undefined, errMsg)
        );
        expect(next.isOffersLoading).toBe(false);
        expect(next.error).toBe(errMsg);
    });

    // fetchOffer
    it('should handle fetchOffer.pending (set offer loading, clear error and reset currentOffer)', () => {
        const prev = { ...initialState, currentOffer: makeOffer('1') };
        const next = offersReducer(prev, fetchOffer.pending('', '1'));
        expect(next.isOfferLoading).toBe(true);
        expect(next.error).toBeNull();
        expect(next.currentOffer).toBeNull();
    });

    it('should handle fetchOffer.fulfilled (set currentOffer and stop loading)', () => {
        const payload = makeOffer('42');
        const prev = { ...initialState, isOfferLoading: true };
        const next = offersReducer(prev, fetchOffer.fulfilled(payload, '', '42'));
        expect(next.isOfferLoading).toBe(false);
        expect(next.currentOffer).equal(payload);
        expect(next.error).toBeNull();
    });

    it('should handle fetchOffer.rejected (stop loading, set error, reset currentOffer)', () => {
        const prev = { ...initialState, isOfferLoading: true, currentOffer: makeOffer('1') };
        const errMsg = 'Failed to fetch offer';
        const next = offersReducer(
            prev,
            fetchOffer.rejected(new Error('err'), '', '1', errMsg),
        );
        expect(next.isOfferLoading).toBe(false);
        expect(next.error).toBe(errMsg);
        expect(next.currentOffer).toBeNull();
    });

    // fetchNearbyOffers
    it('should handle fetchNearbyOffers.fulfilled (set nearbyOffers)', () => {
        const payload = [makeOffer('a'), makeOffer('b')];
        const next = offersReducer(initialState, fetchNearbyOffers.fulfilled(payload, '', '1'));
        expect(next.nearbyOffers).toEqual(payload);
    });

    // fetchReviews
    it('should handle fetchReviews.fulfilled (set reviews)', () => {
        const payload = [makeReview('r1'), makeReview('r2')];
        const next = offersReducer(initialState, fetchReviews.fulfilled(payload, '', '1'));
        expect(next.reviews).toEqual(payload);
    });

    // fetchFavorites
    it('should handle fetchFavorites.fulfilled (mark items as favorite by ids)', () => {
        const i1 = makeOffer('1', false);
        const i2 = makeOffer('2', false);
        const prev = { ...initialState, items: [i1, i2] };

        const favoritesPayload = [makeOffer('2', true)];
        const next = offersReducer(prev, fetchFavorites.fulfilled(favoritesPayload, '', undefined));

        expect(next.items.find(o => o.id === '1')?.isFavorite).toBe(false);
        expect(next.items.find(o => o.id === '2')?.isFavorite).toBe(true);
    });

    // changeFavoriteStatus
    it('should handle changeFavoriteStatus.fulfilled (update items/currentOffer/nearbyOffers by id)', () => {
        const base = makeOffer('10', false);
        const other = makeOffer('20', false);

        const prev = {
            ...initialState,
            items: [base, other],
            currentOffer: base,
            nearbyOffers: [other, base],
        };

        const updated = { ...base, isFavorite: true } as Offer;
        const next = offersReducer(
            prev,
            changeFavoriteStatus.fulfilled(updated, '', { offerId: '10', status: 1 })
        );

        // items: updated offer replaced
        expect(next.items.find(o => o.id === '10')?.isFavorite).toBe(true);
        expect(next.items.find(o => o.id === '20')?.isFavorite).toBe(false);

        // currentOffer updated if ids match
        expect(next.currentOffer?.id).toBe('10');
        expect(next.currentOffer?.isFavorite).toBe(true);

        // nearbyOffers updated by id
        expect(next.nearbyOffers.find(o => o.id === '10')?.isFavorite).toBe(true);
        expect(next.nearbyOffers.find(o => o.id === '20')?.isFavorite).toBe(false);
    });

    // clearFavorites
    it('should handle clearFavorites (set isFavorite=false in items/currentOffer/nearbyOffers)', () => {
        const base = makeOffer('1', true);
        const other = makeOffer('2', true);
        const prev = {
            ...initialState,
            items: [base, other],
            currentOffer: base,
            nearbyOffers: [base, other],
        };

        const next = offersReducer(prev, clearFavorites());

        expect(next.items.every(o => o.isFavorite === false)).toBe(true);
        expect(next.currentOffer?.isFavorite).toBe(false);
        expect(next.nearbyOffers.every(o => o.isFavorite === false)).toBe(true);
    })
});