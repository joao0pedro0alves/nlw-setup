import "./styles/global.css"
import "./lib/dayjs"

import {ToastProvider} from "./components/ToastProvider"
import {AuthContextProvider} from "./contexts/Auth"
import {Routes} from "./routes"

export function App() {
    return (
        <ToastProvider>
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </ToastProvider>
    )
}
