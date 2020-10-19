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

const DecorHex = ({x, y}) => (
    <>
        <div className="decor-hex-container" style={{
            gridRow: y + 1, 
            gridColumn: x + 1,
            marginTop: 
                    x % 2 === 1 ? `4.5em`
                :   y % 2 === 1 ? `0`
                :  /**else */     `0`,
            }}>
            <div className="decor-hex-top"></div>
            <div className="decor-hex" ></div>
            <div className="decor-hex-bottom"></div>
        </div>
    </>
)

const handleClick = (socket, name) => _ => socket.emit('find-new-game', {id: socket.id, name: name.current.value})

const handleInput = setter => e => e.target.value.length > 2 ? setter(false) : setter(true)

export const Lobby = ({socket, initGames}) => {

    const [games, setGames] = useState(initGames)
    const [disabled, setDisabled] = useState(true)
    const name = useRef(null)

    useEffect(() => {
        socket.on('update-lobby', setGames)
        return () => socket.off('update-lobby', setGames)
    }, [socket])

    return (
        <>
            <main className="lobby-main">
                <div className="corner-banner"></div>
                
                <section className="lobby-welcome">
                    <h2 className="lobby-title">Welcome to HEXYS</h2>
                    <h4 className="lobby-subtitle">A Strategy Game Of Attrition</h4>
                </section>

                <section className="lobby-form">
                    <label className="lobby-form-label">Name:</label>
                    <input ref={name} onChange={handleInput(setDisabled)} type="text" placeholder="Enter Your Name..."></input>
                    <button onClick={handleClick(socket, name)} 
                            disabled={disabled}>Find Game</button>
                </section>   

                <div className="decor-container">
                    <div className="decor-grid"
                        style={{
                            gridTemplateColumns: `2.5em `.repeat(5),
                            gridTemplateRows: `2.5em`.repeat(5)
                        }}>
                        {
                            Array(6).fill(0).map((_, i) => {
                                return <DecorHex key={i} x={i%3} y={i%2} />
                            })
                        }
                    </div>
                </div>

                <section className="games-list">
                    <h2 className="games-list-title">Games</h2>
                    {games.map(game => <GameListItem key={game.id} {...game} />)}    
                </section>  

            </main>
        </>
    )
}