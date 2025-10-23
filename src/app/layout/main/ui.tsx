import { useEffect, } from "react"

import { checkAuth } from "../../../entities/auth/model/thunk";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../../shared/lib/store/redux";
import { Header } from "../../../features/header/Header";
import { fetchOffers } from "../../../entities/offer";

export const MainLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchOffers());
    }, [dispatch]);

    return <>
        <Header />
        <Outlet />
    </>
}