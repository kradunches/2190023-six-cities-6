import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const AuthorizationStatus = {
    Authorized: 'authorized',
    Unauthorized: 'unauthorized',
    Unknown: 'unknown',
} as const;

export type AuthorizationStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type AuthState = {
    authorizationStatus: AuthorizationStatus;
};

const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
            state.authorizationStatus = action.payload;
        },
    },
});

export const { setAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;