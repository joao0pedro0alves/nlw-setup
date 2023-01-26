import {useEffect, useState} from 'react'
import {api} from '../lib/axios'
import {Header} from '../components/Header'
import {SummaryItem, SummaryTable} from '../components/SummaryTable'

export function Habits() {
    const [summary, setSummary] = useState<SummaryItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFeed() {
            const response = await api.get('summary')
            setSummary(response.data.summary)
            setLoading(false)
        }

        fetchFeed()
    }, [])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
                <Header />
                <SummaryTable 
                    summary={summary}
                    loading={loading}
                />
            </div>
        </div>
    )
}
