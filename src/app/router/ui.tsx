import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from '../../pages/main';
import { LoginPage } from '../../pages/login';
import { PrivateRoute } from './routes/PrivateRoute';
import { FavoritesPage } from '../../pages/favorites';
import { OfferPage } from '../../pages/offer';
import { NotFound } from '../../pages/notfound/NotFound';
import { MainLayout } from '../layout/main';
import { AuthLayout } from '../layout/auth';

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<MainPage />} />
                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute>
                                <FavoritesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/offer/:id" element={<OfferPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/login" element={<AuthLayout />} >
                    <Route index element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
};

