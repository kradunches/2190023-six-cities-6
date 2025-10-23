import { useEffect, } from "react"


import { useDispatch } from "react-redux";
import { checkAuth } from "../../../entities/auth/model/thunk";

import { Outlet } from "react-router";

const useAppDispatch: () => AppDispatch = useDispatch

export const AuthLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return <>

        <Outlet />
    </>
}