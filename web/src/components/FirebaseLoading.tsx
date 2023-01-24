import firebaseLogo from "../assets/firebase-logo.png"

interface FirebaseLoadingProps {
    loadingText?: string
}

export function FirebaseLoading({loadingText = 'Carregando...'}: FirebaseLoadingProps) {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="mb-6 max-w-[100px] animate-bounce">
                <img className="w-full" src={firebaseLogo} alt="Firebase" />
            </div>

            <span className="text-3xl text-white font-bold">
                {loadingText}
            </span>
        </div>
    )
}
