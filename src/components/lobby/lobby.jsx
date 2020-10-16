import React, {useEffect, useState} from 'react'
import { useRef } from 'react'
import './lobby.sass'

const PENDING = 'Pending',
      ACTIVE  = 'Active'

const GameListItem = ({id, game}) => {
    const STATE = game[1] === null ? PENDING : ACTIVE
    const getText = () =>
        STATE === PENDING ? `Game ${id} -- ${game[0].name}'s Game`
    :   STATE === ACTIVE  ? `Game ${id} -- ${game[0].name} VS. ${game[1].name}`
    :   ''

    const getScore = team => game[0].cells.filter(c => c.cellState === team).length  

    return (
        <>
            <div className="game-li-container">
                <header className="game-li-header">{getText()}</header>
                <section className="game-li-body">
                    {`C: ${getScore('cell')} | B: ${getScore('bacteria')}`}
                </section>
            </div>
        </>
    )
}

const handleClick = (socket, name) => _ => socket.emit('find-new-game', {id: socket.id, name: name.current.value})

const handleInput = setter => e => e.target.value.length > 2 ? setter(false) : setter(true)

export const Lobby = ({socket, initGames}) => {

    const [games, setGames] = useState(initGames)
    const [disabled, setDisabled] = useState(true)
    const name = useRef(null)

    useEffect(() => {
        socket.on('update-lobby', games => setGames(games))
        return () => socket.off('update-lobby', setGames) 
    }, [socket])

    return (
        <>
            <main className="lobby-main">
                <section className="games-list">
                    {games.map(game => <GameListItem {...game} />)}    
                </section>  
                <div className="lobby-welcome">
                    <h2 className="lobby-title">Welcome to HEXYS</h2>
                    <h4 className="lobby-subtitle">A Strategy Game Of Attrition</h4>
                    <div className="lobby-form">
                        <label>Name:</label>
                        <input ref={name} onChange={handleInput(setDisabled)} type="text" placeholder="Enter Your Name..."></input>
                        <button onClick={handleClick(socket, name)} 
                                disabled={disabled}>Find Game</button>
                    </div>
                </div>        
            </main>
        </>
    )
}