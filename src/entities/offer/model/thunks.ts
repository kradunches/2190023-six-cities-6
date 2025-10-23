import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AxiosInstance, AxiosError } from 'axios';
import type { Offer } from '../types/offer';
import type { Review } from '../types/review';

export const fetchOffer = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
    'offers/fetchOffer',
    async (id, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer>(`/offers/${id}`)
            return data;
        } catch (err) {
            return rejectWithValue(`Failed to fetch offer: ${err}`);
        }
    }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
    'offers/fetchNearbyOffers',
    async (id, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
            return data;
        } catch (err) {
            return rejectWithValue(`Failed to fetch nearby offers: ${err}`);
        }
    }
);

export const fetchReviews = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
    'offers/fetchReviews',
    async (id, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Review[]>(`/comments/${id}`);
            return data;
        } catch (err) {
            return rejectWithValue(`Failed to fetch reviews: ${err}`);
        }
    }
);


export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
    'offers/fetchOffers',
    async (_arg, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.get<Offer[]>('/offers');
            return data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch offers: ${error}`);
        }
    }
);

type PostCommentArgs = {
    offerId: string;
    comment: string;
    rating: number;
};

export const postComment = createAsyncThunk<void, PostCommentArgs, { extra: AxiosInstance }>(
    'offers/postComment',
    async ({ offerId, comment, rating }, { extra: api, dispatch, rejectWithValue }) => {
        try {
            await api.post(`/comments/${offerId}`, { comment, rating });
            dispatch(fetchReviews(offerId));
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(`Failed to post comment: ${axiosError}`);
        }
    }
);

export const fetchFavorites = createAsyncThunk<Offer[], void, { extra: AxiosInstance }>(
    'offers/fetchFavorites',
    async (_arg, { extra: api }) => {
        const response = await api.get('/favorite');
        return response.data;
    }
)

export const changeFavoriteStatus = createAsyncThunk<Offer, { offerId: string; status: 0 | 1 }, { extra: AxiosInstance }>(
    'offers/changeFavoriteStatus',
    async ({ offerId, status }, { extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
            return data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(`Failed to change favorite status: ${axiosError}`);
        }
    }
);