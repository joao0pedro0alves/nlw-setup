import {ReactNode, createContext, useEffect, useState} from "react"
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {toast} from 'react-toastify'

import {auth} from '../lib/firebase'
import {CURRENT_USER, TOKEN} from "../constants/storage"
import {api} from "../lib/axios"

export interface User {
    id: string
    name: string
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
    const [user, setUser] = useState<User>(() => {
        const storagedToken = localStorage.getItem(TOKEN)
        const storagedUser = localStorage.getItem(CURRENT_USER)

        if (storagedToken && storagedUser) {
            const user = JSON.parse(storagedUser)
            const token = JSON.parse(storagedToken)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return user as User
        }

        return {} as User
    })

    const [
        signInWithEmailAndPassword,
        userCredencial,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)

    useEffect(() => {

        async function createSession() {
            try {
                if (userCredencial) {
        
                    const tokenResponse = await api.post('/session', {
                        firebaseId: userCredencial.user.uid
                    })

                    const token = tokenResponse.data.token
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    const userInfoResponse = await api.get('/me')
                    const user = userInfoResponse.data.user
            
                    setUser(user)

                    localStorage.setItem(TOKEN, JSON.stringify(token))
                    localStorage.setItem(CURRENT_USER, JSON.stringify(user))
                } 
            } catch (error) {
                toast.error(`${error}`)
            }
        }

        createSession()
    }, [userCredencial])

    useEffect(() => {
        if (error) {
            toast.dark(`Falha ao completar a requisição: ${error}`)
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
