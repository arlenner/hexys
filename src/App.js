import React, { useEffect, useState } from 'react';
import './App.sass';
import { HexMap } from './components/hex-map/hex-map';
import { Loading } from './components/loading/loading'
import { GameOver } from './components/game-over/game-over'

// SOCKET
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:3001'

let socket

const App = () => {

    const [component, setComponent] = useState(<Loading />)

    useEffect(() => {
        socket = socketIOClient(ENDPOINT)
        socket.on('found-game',     data => setComponent(<HexMap initState={data} socket={socket}/>))
        socket.on('finding-game',   () => setComponent(<Loading />))
        socket.on('cell-victory',   () => setComponent(<GameOver socket={socket} cell />))
        socket.on('bact-victory',   () => setComponent(<GameOver socket={socket} bact />))
        socket.on('tie-game',       () => setComponent(<GameOver socket={socket} tie/>))

        return () => socket.disconnect()
    }, [])

    return component
}
export default App;
