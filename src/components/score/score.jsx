import React from 'react'
import './score.sass'

export const Score = ({bacteriaScore, cellScore, state}) => (
    <nav className='score-container'>
        <div className='score-item' >
            <h2 className='score-text' style={{textDecorationLine: state === 'cell' ? '' : 'underline'}}>Bacteria:</h2>
            <h2 className='score-text' style={{color: 'lime'}}>{`${bacteriaScore}`}</h2>
        </div>
        <div className='score-item' >
            <h2 className='score-text' style={{textDecorationLine: state === 'cell' ? 'underline' : ''}}>Cells:</h2>
            <h2 className='score-text' style={{color: "lightskyblue"}}>{`${cellScore}`}</h2>
        </div>
    </nav>
)