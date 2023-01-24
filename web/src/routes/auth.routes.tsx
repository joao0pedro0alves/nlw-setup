import {Switch, Route, Redirect} from "react-router-dom"
import {Register} from "../pages/Register"
import {Signin} from "../pages/SignIn"

export function AuthRoutes() {
    return (
        <Switch>
            <Route path="/" component={() => <Redirect to="/signIn" />} exact />
            <Route path="/signIn" component={Signin} exact />
            <Route path="/register" component={Register} exact />
        </Switch>
    )
}
