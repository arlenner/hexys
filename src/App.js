import React, { useEffect, useState } from 'react';
import './App.sass';
import { HexMap } from './components/hex-map/hex-map';
import { Loading } from './components/loading/loading'
import { GameOver } from './components/game-over/game-over'
import { Lobby } from './components/lobby/lobby'

// SOCKET
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'https://calm-tundra-53705.herokuapp.com/'

let socket

const App = () => {

    const [component, setComponent] = useState(<Loading />)

    useEffect(() => {
        socket = socketIOClient(ENDPOINT, { transports: ['websocket'] })

        // socket.on('send-pair-test', pairs => console.log(pairs))

        socket.on('connected',      games => setComponent(<Lobby socket={socket} initGames={games} />))
        socket.on('found-game',     data => setComponent(<HexMap initState={data} socket={socket}/>))
        socket.on('finding-game',   () => setComponent(<Loading searching />))
        socket.on('cell-victory',   data => setComponent(<GameOver state={data} socket={socket} cell />))
        socket.on('bact-victory',   data => setComponent(<GameOver state={data} socket={socket} bact />))
        socket.on('tie-game',       data => setComponent(<GameOver state={data} socket={socket} tie/>))

        return () => socket.disconnect()
    }, [])

    return component
}
export default App;
