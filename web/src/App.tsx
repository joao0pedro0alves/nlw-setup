import "./styles/global.css"
import "./lib/dayjs"

import {AuthContextProvider} from "./contexts/Auth"
import {Routes} from "./routes"

export function App() {
    return (
        <AuthContextProvider>
            <Routes />
        </AuthContextProvider>
    )
}
