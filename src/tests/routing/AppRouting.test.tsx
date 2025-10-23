import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import App from '../../app';
import { AuthorizationStatus } from '../../entities/auth/model/slice';

vi.mock('../../components/Header', () => ({
    Header: () => <div data-testid="header" />,
}));
vi.mock('../../pages/MainPage', () => ({
    MainPage: () => <div data-testid="main-page">Main Page</div>,
}));
vi.mock('../../pages/LoginPage', () => ({
    LoginPage: () => <div data-testid="login-page">Login Page</div>,
}));
vi.mock('../../pages/FavoritesPage', () => ({
    FavoritesPage: () => <div data-testid="favorites-page">Favorites Page</div>,
}));
vi.mock('../../pages/OfferPage', () => ({
    OfferPage: () => <div data-testid="offer-page">Offer Page</div>,
}));

function makeStore(authStatus: AuthorizationStatus = AuthorizationStatus.Authorized) {
    return configureStore({
        reducer: {
            auth: (state = { authorizationStatus: authStatus }) => state,
        },
        preloadedState: {
            auth: { authorizationStatus: authStatus },
        },
    });
}

function renderWithRouter(path: string, authStatus: AuthorizationStatus = AuthorizationStatus.Authorized) {
    window.history.pushState({}, '', path);
    const store = makeStore(authStatus);
    return render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

describe('App routing', () => {
    it('should render MainPage at "/"', () => {
        renderWithRouter('/', AuthorizationStatus.Authorized);
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('should render LoginPage at "/login"', () => {
        renderWithRouter('/login', AuthorizationStatus.Unauthorized);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should render FavoritesPage at "/favorites" when authorized', () => {
        renderWithRouter('/favorites', AuthorizationStatus.Authorized);
        expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    });

    it('should redirect from FavoritesPage to LoginPage when unauthorized', () => {
        renderWithRouter('/favorites', AuthorizationStatus.Unauthorized);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should redirect to LoginPage from "/favorites" when unauthorized', () => {
        renderWithRouter('/favorites', AuthorizationStatus.Unauthorized);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should render OfferPage at "/offer/:id"', () => {
        renderWithRouter('/offer/abc123', AuthorizationStatus.Authorized);
        expect(screen.getByTestId('offer-page')).toBeInTheDocument();
    });

    it('should render NotFound for unknown paths', () => {
        renderWithRouter('/some-unknown', AuthorizationStatus.Authorized);
        expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
    });

    it('should navigate to "/404" also renders NotFound via catch-all route', () => {
        renderWithRouter('/404', AuthorizationStatus.Authorized);
        expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
    });
});