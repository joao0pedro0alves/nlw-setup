import {useState, ReactNode} from 'react'
import * as Toast from '@radix-ui/react-toast'
import {X} from 'phosphor-react'
import clsx from 'clsx'

interface ToastProviderProps {
    children: ReactNode
}

function ToastContent() {
    const [open, setOpen] = useState(true)

    return (
        <Toast.Root
            className={clsx(
                'bg-zinc-800 ring-2 ring-violet-900 rounded-lg p-4 flex gap-2 justify-between items-center',
                'data-[state="open"]:animate-[slide_200ms_ease-in]',
                'data-[state="closed"]:animate-[hide_100ms_ease-in]',
            )}
            open={open} 
            onOpenChange={setOpen}
        >
            <div>
                <Toast.Title className='text-violet-500 font-semibold'>
                    Atenção
                </Toast.Title>

                <Toast.Description className='text-sm text-zinc-300' asChild>
                    <span>O usuário não existe no nosso sistema!</span>
                </Toast.Description>
            </div>

            <Toast.Action asChild altText="Close toast">
                <button className='p-2 rounded-full hover:bg-zinc-600 transition-colors'>
                    <X className='text-violet-500' weight='bold'/>
                </button>
            </Toast.Action>
        </Toast.Root>
    )
}

export function ToastProvider({children}: ToastProviderProps) {

    return (
        <Toast.Provider duration={150000} swipeDirection="right">
            {children}

            <ToastContent />

            <Toast.Viewport 
                className='fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-[390px] max-w-[100vw] z-50'
            />
        </Toast.Provider>
    )
}