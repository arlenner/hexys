import React from 'react'
import './game-over.sass'

const handleClick = (socket, state) => _ => {
    socket.emit('find-new-game', { 
        name: state.game[0].socketID === socket.id ? state.game[0].name : state.game[1].name,
        id: socket.id
    })
}

const handleBackToLobby = socket =>  _ => socket.emit('to-lobby')

const Body = ({state, socket, text}) => (
    <>
        <main className="game-over">
            <header className="game-over-header">
                <h2>{text}</h2>
            </header>
            <footer className="game-over-footer">
                <button onClick={handleClick(socket, state)}>Play Again?</button>
                <button onClick={handleBackToLobby(socket)}>Lobby</button>
            </footer>
        </main>
    </>
)

export const GameOver = ({state, socket, cell = false, bact = false, tie = false}) => (
    cell    ? (<Body state={state} socket={socket} text="Cells Win!"/>)
:   bact    ? (<Body state={state} socket={socket} text="Bacteria Win!"/>)
:   tie     ? (<Body state={state} socket={socket} text="You and Your Opponent Have Tied."/>)
:             (<></>)

)