import React, { useEffect, useState } from 'react'
import './loading.sass'

export const Loading = ({searching = false}) => {

    const [dots, setDots] = useState('')

    useEffect(() => {
        const id = setInterval(() => {
            setDots('.'.repeat((dots.length % 3) + 1))
        }, 1000)

        return () => clearInterval(id)
    }, [dots])


    return (
        <>
            <main className="loading-main">
                
                <div className="loading-anim">
                    <div className="loading-anim-top"></div>                    
                    <div className="loading-anim-center"></div>                    
                    <div className="loading-anim-bottom"></div>                    
                </div>

                <div className="loading-text-container">
                    <h2 className="loading-text">{searching ? `Searching for other players${dots}` : ``}</h2>
                </div>
            </main>
        </>
    )
}