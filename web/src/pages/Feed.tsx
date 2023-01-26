import {useState, useEffect} from 'react'
import * as Avatar from '@radix-ui/react-avatar'

import logoImage from "../assets/logo.svg"
import {SummaryItem, SummaryTable} from '../components/SummaryTable'
import {User} from '../contexts/Auth'
import {api} from '../lib/axios'

interface Summary {
    user: User
    summary: SummaryItem[]
}

export function Feed() {
    const [feed, setFeed] = useState<Summary[]>([])

    useEffect(() => {
        async function fetchFeed() {
            const response = await api.get('feed')
            setFeed(response.data.feed)
        }

        fetchFeed()
    }, [])

    return (
        <div className="w-screen flex justify-center items-center mt-20">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-8">
                <header className='w-full mx-auto'>
                    <img src={logoImage} alt="Habits" />
                </header>

                {feed.length > 0 && feed.map(({summary, user}) => {

                    return (
                        <div
                            key={user.id}
                            className='flex flex-col gap-2 border-t border-zinc-800 py-4'
                        >
                            <div className='mb-2 flex gap-6'>
                                <Avatar.Root className='inline-flex items-center justify-center align-middle overflow-hidden select-none w-12 h-12 rounded-full bg-zinc-800'>
                                    <Avatar.Image
                                        className='w-full h-full object-cover'
                                        src="/" 
                                        alt={user.name} 
                                    />
                                    <Avatar.Fallback className="uppercase w-full h-full flex items-center justify-center bg-white text-violet-500 fon-bold leading-none" delayMs={600}>
                                        {user.name.slice(0, 2)}
                                    </Avatar.Fallback>
                                </Avatar.Root>

                                <div className='flex flex-1 flex-col'>
                                    <span className='font-bold text-violet-500 uppercase'>{user.name}</span>
                                    <span className='text-sm text-zinc-400'>{user.email}</span>
                                </div>
                            </div>

                            <SummaryTable
                                summary={summary}
                                disabledHabitPopover
                                size='medium'
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
