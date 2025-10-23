import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers, fetchOffer, fetchNearbyOffers, fetchReviews, changeFavoriteStatus, fetchFavorites } from './thunks';
import type { Offer } from '../interface';
import type { Review } from '../../review';

export type OffersState = {
    items: Offer[];
    currentOffer: Offer | null;
    nearbyOffers: Offer[];
    reviews: Review[];
    isOffersLoading: boolean;
    isOfferLoading: boolean;
    error: string | null;
};

const initialState: OffersState = {
    items: [],
    currentOffer: null,
    nearbyOffers: [],
    reviews: [],
    isOffersLoading: false,
    isOfferLoading: false,
    error: null,
}

export const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // offers
            .addCase(fetchOffers.pending, (state) => {
                state.isOffersLoading = true;
                state.error = null;
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.isOffersLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.isOffersLoading = false;
                state.error = action.payload as string
            })
            // offer
            .addCase(fetchOffer.pending, (state) => {
                state.isOfferLoading = true;
                state.error = null;
                state.currentOffer = null;
            })
            .addCase(fetchOffer.fulfilled, (state, action) => {
                state.isOfferLoading = false;
                state.currentOffer = action.payload;
                // console.log('fetchedOffer fulfilled: ', state.currentOffer);
            })
            .addCase(fetchOffer.rejected, (state, action) => {
                state.isOfferLoading = false;
                state.error = action.payload as string;
                state.currentOffer = null;
            })
            // nearby
            .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
                state.nearbyOffers = action.payload;
                // console.log('fetchedNearbyOffers fulfilled: ', state.nearbyOffers);
            })
            // reviews
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                // console.log('fetchedReviews fulfilled: ', state.reviews);
            })
            // favorites
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                const favoriteIds = new Set(action.payload.map((offer) => offer.id));
                state.items = state.items.map((offer) => ({
                    ...offer,
                    isFavorite: favoriteIds.has(offer.id)
                }));
            })
            .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
                const updatedOffer = action.payload;
                state.items = state.items.map((offer) =>
                    offer.id === updatedOffer.id ? updatedOffer : offer
                );
                if (state.currentOffer?.id === updatedOffer.id) {
                    state.currentOffer = updatedOffer;
                }
                state.nearbyOffers = state.nearbyOffers.map((offer) =>
                    offer.id === updatedOffer.id ? updatedOffer : offer
                );
            })
            .addCase(clearFavorites, (state) => {
                state.items = state.items.map((offer) => ({
                    ...offer,
                    isFavorite: false
                }));
                if (state.currentOffer) {
                    state.currentOffer = { ...state.currentOffer, isFavorite: false };
                }
                state.nearbyOffers = state.nearbyOffers.map((offer) => ({
                    ...offer,
                    isFavorite: false
                }));
            });
    },
});

export default offersSlice.reducer;