import type { PropsWithChildren } from "react"
import { store } from "../store"
import { Provider } from "react-redux"

export const Providers = ({ children }: PropsWithChildren) => {
    return <>
        <Provider store={store}>{children}</Provider>
    </>
}