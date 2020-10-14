import React from 'react'
import './loading.sass'

export const Loading = ({detail = ''}) => (
    <>
        <main className="loading-main">
            <div className="loading-anim-container">
                <div className="loading-anim"></div>
                <footer className="loading-detail">{detail}</footer>
            </div>
        </main>
    </>
)