import {FormEvent, useState} from "react"
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {CaretRight} from "phosphor-react"
import {Link} from "react-router-dom"

import logoImage from "../assets/logo.svg"
import {auth} from '../lib/firebase'

import {FirebaseLoading} from "../components/FirebaseLoading"

export function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)

    function handleSignIn(event: FormEvent) {
        event.preventDefault()

        signInWithEmailAndPassword(email, password)
    }

    if (loading) {
        return <FirebaseLoading />
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">

            <form onSubmit={handleSignIn} className="flex flex-col min-w-[400px]">
                <div className="mb-6">
                    <img src={logoImage} alt="Habits" />
                </div>

                <p className="font-extrabold text-lg text-zinc-400 mb-4">
                    Faça login na plataforma
                </p>

                <label className="font-semibold leading-tight mt-4" htmlFor="email">
                    E-mail
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Qual seu e-mail?"
                    className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />      

                <label className="font-semibold leading-tight mt-4" htmlFor="password">
                    Senha
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Qual sua senha?"
                    className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                    ENTRAR
                </button>
            </form>

            <span
                className='flex gap-2 items-center mt-6'
            >
                Não possui uma conta? <Link to='register' className="text-sm font-bold text-violet-500 hover:underline hover:text-violet-600">Registre-se</Link>
                <CaretRight weight="bold" className="text-violet-500" size={16} />
            </span>
        </div>
    )
}
