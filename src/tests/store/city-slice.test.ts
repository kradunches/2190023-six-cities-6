import { describe, it, expect } from 'vitest';
import cityReducer, { resetCityChanged } from '../../store/city-slice';
import { changeCity } from '../../store/action';
import { CITY_COORDINATES } from '../../shared/lib/consts/city-coordinates';

describe('citySliceReducer', () => {
    it('should return initial state', () => {
        expect(cityReducer(undefined, { type: '' })).toEqual({
            name: 'Paris',
            coords: CITY_COORDINATES['Paris'],
            cityChanged: true,
        });
    });

    it('should handle resetCityChanged (set cityChanged=false)', () => {
        const prev = {
            name: 'Paris',
            coords: CITY_COORDINATES['Paris'],
            cityChanged: true,
        };
        const next = cityReducer(prev, resetCityChanged());
        expect(next.cityChanged).toBe(false);
        expect(next.name).toBe('Paris');
        expect(next.coords).toEqual(CITY_COORDINATES['Paris']);
    });

    it('should handle changeCity (set name/coords/cityChanged=true)', () => {
        const prev = {
            name: 'Paris',
            coords: CITY_COORDINATES['Paris'],
            cityChanged: false,
        };
        const next = cityReducer(prev, changeCity('Dusseldorf'));
        expect(next.name).toBe('Dusseldorf');
        expect(next.coords).toEqual(CITY_COORDINATES['Dusseldorf']);
        expect(next.cityChanged).toBe(true);
    });
});