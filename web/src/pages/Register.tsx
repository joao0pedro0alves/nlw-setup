import {FormEvent, useState, useEffect} from 'react'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {Link} from 'react-router-dom'
import {CaretLeft} from 'phosphor-react'
import {toast} from 'react-toastify'

import logoImage from '../assets/logo.svg'
import {auth} from '../lib/firebase'
import {api} from '../lib/axios'

import {FirebaseLoading} from '../components/FirebaseLoading'

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [createUserWithEmailAndPassword, result, loading, error] =
        useCreateUserWithEmailAndPassword(auth)

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        async function createUser() {
            try {
                if (result) {
                    await api.post('/users', {
                        name: 'João Pedro',
                        firebaseId: result.user.uid,
                        email: result.user.email,
                    })
                }
            } catch (error) {
                toast.error(`${error}`)
            }

            setEmail('')
            setPassword('')
        }

        createUser()
    }, [result])

    useEffect(() => {
        if (error) {
            toast.dark(`Falha ao completar a requisição: ${error}`)
        }
    }, [error])

    if (loading) {
        return <FirebaseLoading loadingText="Registrando usuário..." />
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col min-w-[400px]"
            >
                <div className="mb-6">
                    <img src={logoImage} alt="Habits" />
                </div>

                <p className="font-extrabold text-lg text-zinc-400 mb-4">
                    Preencha os campos para se registrar.
                </p>

                <label
                    className="font-semibold leading-tight mt-4"
                    htmlFor="email"
                >
                    Qual seu e-mail ?
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="ex.: fulano@gmail.com"
                    className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label
                    className="font-semibold leading-tight mt-4"
                    htmlFor="password"
                >
                    Qual sua senha?
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="ex.: #Aycasndc164..."
                    className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                    REGISTRAR
                </button>
            </form>

            <span className="flex gap-2 items-center mt-6">
                <CaretLeft
                    className="text-violet-500"
                    weight="bold"
                    size={16}
                />
                <Link
                    to="signIn"
                    className="text-sm font-bold text-violet-500 hover:underline hover:text-violet-600"
                >
                    Voltar para o login
                </Link>
            </span>
        </div>
    )
}
