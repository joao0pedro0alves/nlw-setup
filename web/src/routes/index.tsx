import {BrowserRouter as Router} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"
import {AppRoutes} from "./app.routes"
import {AuthRoutes} from "./auth.routes"

export function Routes() {
    const {user} = useAuth()
    const authenticated = Boolean(user.email)

    return (
        <Router>
            {authenticated ? <AppRoutes /> : <AuthRoutes />}
        </Router>
    )
}
