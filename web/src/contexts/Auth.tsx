import {ReactNode, createContext, useEffect, useState} from "react"
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'

import {auth} from '../lib/firebase'
import {CURRENT_USER, TOKEN} from "../constants/storage"
// import {api} from "../lib/axios"

interface User {
    email: string
}

interface SignInCredencials {
    email: string
    password: string
}

interface AuthContextData {
    user: User
    loading: boolean
    signIn: (credencials: SignInCredencials) => void
    signOut: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState({} as User)

    const [
        signInWithEmailAndPassword,
        userCredencial,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (userCredencial) {
            // localStorage.setItem(TOKEN)
            // localStorage.setItem(CURRENT_USER)

            setUser({
                email: userCredencial.user.email || ''
            })
        }
    }, [userCredencial])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    function signIn({email, password}: SignInCredencials) {
        signInWithEmailAndPassword(email, password)
    }

    function signOut() {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(CURRENT_USER)
        setUser({} as User)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
