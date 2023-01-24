import {BrowserRouter as Router} from "react-router-dom"
import {AppRoutes} from "./app.routes"
import {AuthRoutes} from "./auth.routes"

export function Routes() {
    const authenticated = false

    return <Router>{authenticated ? <AppRoutes /> : <AuthRoutes />}</Router>
}
