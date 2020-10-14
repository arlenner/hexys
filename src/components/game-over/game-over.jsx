import React from 'react'

const handleClick = socket => _ => {
    socket.emit('find-new-game', socket.id)
}

const Body = ({socket, text}) => (
    <>
        <main className="game-over">
            <header className="game-over-header">
                <h2>{text}</h2>
            </header>
            <footer className="game-over-footer">
                <button onClick={handleClick(socket)}>Play Again?</button>
            </footer>
        </main>
    </>
)

export const GameOver = ({socket, cell = false, bact = false, tie = false}) => (
    cell    ? (<Body socket={socket} text="Cells Win!"/>)
:   bact    ? (<Body socket={socket} text="Bacteria Win!"/>)
:   tie     ? (<Body socket={socket} text="You and Your Opponent Have Tied."/>)
:             (<></>)

)