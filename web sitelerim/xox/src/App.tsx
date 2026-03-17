import { useState } from 'react'
import TicTacToe from './components/TicTacToe'
import Lobby from './components/Lobby'
import MultiplayerGame from './components/MultiplayerGame'
import './App.css'

type AppMode = 'menu' | 'single' | 'multiplayer'

function App() {
  const [mode, setMode] = useState<AppMode>('menu')
  const [roomId, setRoomId] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [roomName, setRoomName] = useState('')

  const handleMainMenu = () => {
    setMode('menu')
    setRoomId('')
    setPlayerName('')
    setRoomName('')
  }

  return (
    <>
      {mode === 'menu' && (
        <div className="main-menu">
          <h1>🎮 XOX Oyunu</h1>
          <p className="menu-subtitle">Arkadaşlarınla veya tek başına oyna!</p>
          <div className="menu-buttons">
            <button className="btn btn-mode" onClick={() => setMode('single')}>
              👤 Tek Oyuncu
            </button>
            <button className="btn btn-mode" onClick={() => setMode('multiplayer')}>
              👥 Çok Oyunculu
            </button>
          </div>
        </div>
      )}

      {mode === 'single' && (
        <div className="single-mode">
          <TicTacToe />
        </div>
      )}

      {mode === 'multiplayer' && !roomId && (
        <Lobby
          onCreateRoom={(code, name, roomName) => {
            setRoomId(code)
            setPlayerName(name)
            setRoomName(roomName)
            setMode('multiplayer')
          }}
          onJoinRoom={(code, name) => {
            setRoomId(code)
            setPlayerName(name)
            setMode('multiplayer')
          }}
        />
      )}

      {mode === 'multiplayer' && roomId && (
        <MultiplayerGame
          roomId={roomId}
          playerName={playerName}
          roomName={roomName}
          onBackToLobby={handleMainMenu}
        />
      )}
    </>
  )
}

export default App
