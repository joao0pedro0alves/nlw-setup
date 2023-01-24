import {Redirect, Route, Switch} from "react-router-dom"
import {SignOut} from "phosphor-react"

import {useAuth} from "../hooks/useAuth"
import {Habits} from "../pages/Habits"

export function AppRoutes() {
    const {signOut} = useAuth()

    return (
        <>
            <Switch>
                <Route path="/" component={Habits} exact />
                <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>

            <button
                className="fixed top-4 right-4 flex items-center gap-2 font-bold text-sm uppercase py-2 px-4 rounded-lg bg-violet-500 hover:bg-violet-600"
                onClick={signOut}
            >
                Sair
                <SignOut />
            </button>
        </>
    )
}
