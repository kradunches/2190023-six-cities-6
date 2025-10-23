import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;
const TOKEN_KEY = 'six-cities-token';

const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers['X-Token'] = token;
        }
        return config;
    });

    return api;
};

export const api = createAPI();

