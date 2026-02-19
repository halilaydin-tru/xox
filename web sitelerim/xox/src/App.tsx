import { useState, useEffect, useRef, useCallback } from 'react';
import Peer, { DataConnection } from 'peerjs';
import './App.css';

type Player = 'X' | 'O' | '';
type Winner = 'X' | 'O' | 'draw' | null;

interface GameData {
  type: 'INIT_GAME' | 'MOVE' | 'RESET';
  size?: number;
  index?: number;
  symbol?: Player;
}

interface ConnectionStatus {
  status: 'idle' | 'connecting' | 'connected' | 'failed';
  error?: string;
}

function App() {
  const [myId, setMyId] = useState<string>('');
  const [opponentId, setOpponentId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(3);
  const [board, setBoard] = useState<Player[]>(Array(9).fill(''));
  const [turn, setTurn] = useState<Player>('X');
  const [mySymbol, setMySymbol] = useState<Player>('');
  const [winner, setWinner] = useState<Winner>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ status: 'idle' });
  const [copiedMessage, setCopiedMessage] = useState<string>('');
  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);

  // Kazanma Kontrolü
  const checkWin = useCallback((currentBoard: Player[], symbol: Player): boolean => {
    const size = Math.sqrt(currentBoard.length);
    
    // Satırlar
    for (let i = 0; i < size; i++) {
      if (currentBoard.slice(i * size, (i + 1) * size).every(c => c === symbol)) return true;
    }
    // Sütunlar
    for (let i = 0; i < size; i++) {
      let colWin = true;
      for (let j = 0; j < size; j++) {
        if (currentBoard[j * size + i] !== symbol) colWin = false;
      }
      if (colWin) return true;
    }
    // Çaprazlar
    let d1 = true, d2 = true;
    for (let i = 0; i < size; i++) {
      if (currentBoard[i * size + i] !== symbol) d1 = false;
      if (currentBoard[i * size + (size - 1 - i)] !== symbol) d2 = false;
    }
    return d1 || d2;
  }, []);

  const updateBoard = useCallback((index: number, symbol: Player) => {
    setBoard(prev => {
      const newBoard = [...prev];
      newBoard[index] = symbol;

      if (checkWin(newBoard, symbol)) {
        setWinner(symbol as Winner);
        setScores(prevScore => ({ ...prevScore, [symbol]: prevScore[symbol as 'X' | 'O'] + 1 }));
      } else if (!newBoard.includes('')) {
        setWinner('draw');
      }
      return newBoard;
    });
    setTurn(symbol === 'X' ? 'O' : 'X');
  }, [checkWin]);

  // Veri İşleme
  const handleData = useCallback((data: GameData) => {
    if (data.type === 'INIT_GAME' && data.size) {
      setGridSize(data.size);
      setBoard(Array(data.size * data.size).fill(''));
      setMySymbol('O');
      setIsConnected(true);
    } 
    else if (data.type === 'MOVE' && typeof data.index === 'number' && data.symbol) {
      updateBoard(data.index, data.symbol);
    }
    else if (data.type === 'RESET' && data.size) {
      setBoard(Array(data.size * data.size).fill(''));
      setWinner(null);
      setTurn('X');
    }
  }, [updateBoard]);

  // Bağlantı Kurulumu
  const setupConnection = useCallback((connection: DataConnection) => {
    connRef.current = connection;

    connection.on('open', () => {
      setIsConnected(true);
    });

    connection.on('data', (data: unknown) => {
      handleData(data as GameData);
    });

    connection.on('close', () => {
      alert("Rakip oyundan düştü!");
      setIsConnected(false);
      setConnectionStatus({ status: 'idle' });
      window.location.reload();
    });
  }, [handleData]);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setMyId(id);
    });

    peer.on('connection', (connection) => {
      setIsHost(true);
      setMySymbol('X');
      setupConnection(connection);
      
      setTimeout(() => {
        connection.send({ type: 'INIT_GAME', size: gridSize });
      }, 500);
    });

    peerRef.current = peer;
    return () => peer.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Sadece ilk açılışta çalışsın

  // Oyunu Başlat (Join)
  const connectToPeer = () => {
    if (!opponentId.trim()) {
      setConnectionStatus({ status: 'failed', error: 'Lütfen bir kod girin!' });
      return;
    }
    if (!peerRef.current) {
      setConnectionStatus({ status: 'failed', error: 'PeerJS başlatılmadı!' });
      return;
    }
    
    setConnectionStatus({ status: 'connecting' });
    try {
      const connection = peerRef.current.connect(opponentId.trim());
      
      // Bağlantı timeout'u
      const timeoutId = setTimeout(() => {
        connection.close();
        setConnectionStatus({ status: 'failed', error: 'Bağlantı zaman aşımı (30 saniye)' });
      }, 30000);
      
      connection.on('open', () => {
        clearTimeout(timeoutId);
        setConnectionStatus({ status: 'connected' });
      });
      
      setupConnection(connection);
    } catch (err) {
      setConnectionStatus({ status: 'failed', error: 'Bağlantı hatası: ' + String(err) });
    }
  };

  const makeMove = (index: number) => {
    if (!isConnected || winner || board[index] !== '' || turn !== mySymbol) return;
    
    updateBoard(index, mySymbol);
    connRef.current?.send({ type: 'MOVE', index, symbol: mySymbol });
  };

  const handleReset = () => {
    const newBoard = Array(gridSize * gridSize).fill('');
    setBoard(newBoard);
    setWinner(null);
    setTurn('X');
    connRef.current?.send({ type: 'RESET', size: gridSize });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myId);
    setCopiedMessage('Kod kopyalandı! 📋');
    setTimeout(() => setCopiedMessage(''), 2000);
  };

  if (isConnected) {
    return (
      <div className="App">
        <div className="container">
          <h2>XOX - {isHost ? "(Kurucu)" : "(Misafir)"}</h2>
          <div className="scores">
            <span style={{color: mySymbol === 'X' ? '#61dafb' : 'white'}}>Sen: {mySymbol}</span>
            <span>Skor - X: {scores.X} | O: {scores.O}</span>
          </div>
          
          <h3 style={{color: winner ? '#ff4e4e' : (turn === mySymbol ? '#4eff4e' : 'white')}}>
            {winner ? (winner === 'draw' ? 'Berabere!' : `Kazanan: ${winner}`) : (turn === mySymbol ? "SIRA SENDE" : "Rakip Bekleniyor...")}
          </h3>

          <div className="game-board" style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
            {board.map((cell, idx) => (
              <div key={idx} className="cell" onClick={() => makeMove(idx)}>
                {cell}
              </div>
            ))}
          </div>

          {winner && <button onClick={handleReset} style={{marginTop: 20}}>Tekrar Oyna</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>🎮 XOX Oyunu</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Vercel'de Canlı - 2 Oyuncu P2P Oyunu</p>
        
        <div className="card">
          <h3>1️⃣ Oda Kur</h3>
          <label>Oyun Boyutu Seç:</label>
          <select value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value))}>
            <option value="3">3x3 (Klasik)</option>
            <option value="4">4x4 (Orta)</option>
            <option value="5">5x5 (Zor)</option>
          </select>
          <div className="code-box">
            <div className="code-label">Odanın Kodu:</div>
            <div className="code-display" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
              <strong style={{color:'#61dafb', userSelect:'all'}}>{myId || '⏳ Yükleniyor...'}</strong>
              {myId && <span className="copy-hint">👆 Tıkla & Kopyala</span>}
            </div>
            {copiedMessage && <div className="copy-message">{copiedMessage}</div>}
          </div>
        </div>

        <div className="card">
          <h3>2️⃣ Odaya Gir</h3>
          <label>Arkadaşının Kodunu Yapıştır:</label>
          <input 
            placeholder="Ör: AbCd1234..." 
            value={opponentId} 
            onChange={(e) => setOpponentId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && connectToPeer()}
          />
          <button 
            onClick={connectToPeer}
            disabled={connectionStatus.status === 'connecting'}
            className={connectionStatus.status === 'connecting' ? 'loading' : ''}
          >
            {connectionStatus.status === 'connecting' ? '⏳ Bağlanıyor...' : '🔗 Bağlan'}
          </button>
          
          {connectionStatus.error && (
            <div className="error-message">❌ {connectionStatus.error}</div>
          )}
        </div>

        <div className="info-box">
          <p><strong>Nasıl Oynanır:</strong></p>
          <ul>
            <li>Birinci oyuncu "Oda Kur" ile kodu alır</li>
            <li>Kodu arkadaşına gönderir (WhatsApp, SMS, vb.)</li>
            <li>İkinci oyuncu kodu "Odaya Gir" ile yapıştırıp bağlanır</li>
            <li>Birlikte oynayabilirsiniz! 🎯</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;