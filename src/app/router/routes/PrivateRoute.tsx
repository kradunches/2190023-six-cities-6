import React from "react";
import { AuthorizationStatus } from "../../../entities/auth/model/slice";
import { Navigate } from 'react-router';
import { Spinner } from "../../../shared/ui/Spinner";
import { useAppSelector } from "../../../shared/lib/store/redux";

type PrivateRouteProps = {
    children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authorizedStatus = useAppSelector((state) => state.auth.authorizationStatus);

    if (authorizedStatus === AuthorizationStatus.Unknown) {
        return <div><span>Проверка авторизации...</span><Spinner /></div>
    }

    if (authorizedStatus !== AuthorizationStatus.Authorized) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}