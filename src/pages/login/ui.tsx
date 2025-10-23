import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { AuthorizationStatus } from '../../entities/auth/model/slice';
import { handleLoginSubmit } from '../../functions/async-acts';
import { useAppDispatch, useAppSelector } from '../../shared/lib/store/redux';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        await handleLoginSubmit(e, email, password, dispatch, navigate, setError);
    };

    if (authorizationStatus === AuthorizationStatus.Authorized) {
        return <Navigate to="/" replace />;
    }

    return (
        <>

            <div className="page page--gray page--login">
                <main className="page__main page__main--login">
                    <div className="container">
                        <section className="login">
                            <h1 className="login__title">Sign in</h1>
                            <form className="login__form form" onSubmit={handleSubmit}>
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label>
                                        E-mail
                                        <input
                                            className="login__input form__input"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label>
                                        Password
                                        <input
                                            className="login__input form__input"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                {error && <div className="login__error">{error}</div>}
                                <button className="login__submit form__submit button" type="submit">
                                    Sign in
                                </button>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};