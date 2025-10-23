import { createSlice } from '@reduxjs/toolkit';
import { CITY_COORDINATES } from '../../../shared/lib/consts/city-coordinates';
import { changeCity } from '../../../store/action';

export type CityState = {
    name: string;
    coords: [number, number];
    cityChanged: boolean;
}

const initialCity: CityState = {
    name: 'Paris',
    coords: CITY_COORDINATES['Paris'],
    cityChanged: true,
};

export const citySlice = createSlice({
    name: 'city',
    initialState: initialCity,
    reducers: {
        resetCityChanged(state) {
            state.cityChanged = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeCity, (_state, action) => ({
            name: action.payload,
            coords: CITY_COORDINATES[action.payload] || CITY_COORDINATES['Paris'],
            cityChanged: true,
        }));
    },
});

export const { resetCityChanged } = citySlice.actions;
export default citySlice.reducer;