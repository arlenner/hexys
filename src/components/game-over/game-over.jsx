import React from 'react'
import './game-over.sass'

const handleClick = (socket, state) => _ => {
    socket.emit('find-new-game', { name: state.games.find(g => g.socketID === socket.id).name, id: socket.id})
}

const Body = ({state, socket, text}) => (
    <>
        <main className="game-over">
            <header className="game-over-header">
                <h2>{text}</h2>
            </header>
            <footer className="game-over-footer">
                <button onClick={handleClick(socket, state)}>Play Again?</button>
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