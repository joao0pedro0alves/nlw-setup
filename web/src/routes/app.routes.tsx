import {Link, Redirect, Route, Switch} from "react-router-dom"
import {SignOut} from "phosphor-react"

import {useAuth} from "../hooks/useAuth"
import {Feed} from "../pages/Feed"
import {Habits} from "../pages/Habits"

export function AppRoutes() {
    const {signOut} = useAuth()

    return (
        <>
            <nav className="bg-background z-10 p-4 fixed top-0 w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Link
                        className="flex items-center gap-2 font-semibold text-sm py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                        to='/'
                    >
                        Feed
                    </Link>

                    <Link
                        className="flex items-center gap-2 font-semibold text-sm py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                        to='/my-habits'
                    >
                        Meus hábitos
                    </Link>
                </div>

                <button
                    className="flex items-center gap-2 font-bold text-sm uppercase py-2 px-4 rounded-lg bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    onClick={signOut}
                >
                    Sair
                    <SignOut weight="bold"/>
                </button>
            </nav>
            
            <Switch>
                <Route path="/" component={Feed} exact />
                <Route path="/my-habits" component={Habits} exact />
                <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
        </>
    )
}
