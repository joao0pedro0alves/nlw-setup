import "react-toastify/dist/ReactToastify.css"
import "./styles/global.css"
import "./lib/dayjs"

import {ToastContainer} from "react-toastify"

import {AuthContextProvider} from "./contexts/Auth"
import {Routes} from "./routes"

export function App() {
    return (
        <AuthContextProvider>
            <Routes />
            <ToastContainer
                theme="colored"
                toastClassName="text-sm font-bold bg-zinc-900"
                hideProgressBar
            />
        </AuthContextProvider>
    )
}
