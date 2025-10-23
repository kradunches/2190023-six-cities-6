import { createAction } from "@reduxjs/toolkit";
import type { Offer } from "../interface";

export const fillOffers = createAction<Offer[]>('offers/fillOffers'); // я использую thunk, так что этот экшн не нужен (пока оставлю, вдруг потом пригодится)
export const clearFavorites = createAction('favorites/clearfavorites');