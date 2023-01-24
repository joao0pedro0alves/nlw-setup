import {Route, Switch} from "react-router-dom"
import {Habits} from "../pages/Habits"

export function AppRoutes() {
    return (
        <Switch>
            <Route path="/" component={Habits} exact />
        </Switch>
    )
}
