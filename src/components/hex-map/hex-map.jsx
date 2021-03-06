import React, { useEffect, useState } from 'react'
import { Score } from '../score/score'
import { HexCell } from './hex-cell'
import './hex-map.sass'

const GAME_MODEL = {
    id: '',
    turn: 'cell',
    selected: null,
    runningMove: false,
    divs: [],
    jumps: [],
    cells: []
}

const HexMap = ({initState, socket}) => {

    const [state, setState] = useState(GAME_MODEL)

    useEffect(() => {
        setState(initState)
        socket.on('update', setState) 
        socket.on('found-game', setState)

        return () => {
            socket.off('update', setState)
            socket.off('found-game', setState)
        }
    }, [initState, socket])

    return (
        <main className="map-main">
            <Score bacteriaScore={state.cells.filter(c => c.cellState === 'bacteria').length}
                   cellScore={state.cells.filter(c => c.cellState === 'cell').length}
                   state={state.team}
                   name={state.name}
                   opponentName={state.opponentName}/>
            <div className="map-container">
                {state.cells.map(cell => 
                    <HexCell key={`${cell.x},${cell.y}`}
                            cellState={cell.cellState} 
                            x={cell.x} 
                            y={cell.y} 
                            state={state}
                            socket={socket} />)
                }
            </div>
        </main>
    )
}




export { HexMap }