import Game from "./pages/Game";
import AddPlayer from "./pages/AddPlayer";
import EditPlayer from "./pages/EditPlayer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";

export default function App() {
  const [screen, setScreen] = useState("game");
  const [players, setPlayers] = useLocalStorage("players", []);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Check viewport width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenTooSmall(window.innerWidth < 600);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // PWA Install Prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt after a short delay
      setTimeout(() => setShowInstallPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Add 2 placeholder players if none exist on first load
  useEffect(() => {
    if (players.length === 0) {
      setPlayers([
        { name: "Player 1", score: 0, color: "#FF5555" },
        { name: "Player 2", score: 0, color: "#5555FF" }
      ]);
    }
  }, []);

  const handleAddPlayer = (player) => {
    setPlayers([...players, player]);
    setScreen("game");
  };

  const handleEditPlayer = (index) => {
    setEditingPlayerIndex(index);
    setScreen("editPlayer");
  };

  const handleUpdatePlayer = (updatedPlayer) => {
    setPlayers(players.map((p, i) => i === editingPlayerIndex ? updatedPlayer : p));
    setScreen("game");
    setEditingPlayerIndex(null);
  };

  const handleDeletePlayer = () => {
    setPlayers(players.filter((_, i) => i !== editingPlayerIndex));
    setScreen("game");
    setEditingPlayerIndex(null);
  };

  return (
    <>
      {/* PWA Install Prompt */}
      {showInstallPrompt && deferredPrompt && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FF5555',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          maxWidth: '90vw'
        }}>
          <span style={{ fontWeight: 'bold' }}>Install Horrible Hearts on your device?</span>
          <button
            onClick={handleInstallClick}
            style={{
              backgroundColor: 'white',
              color: '#FF5555',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Install
          </button>
          <button
            onClick={() => setShowInstallPrompt(false)}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {isScreenTooSmall ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '30px'
          }}>
            📱↻
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0 0 20px 0'
          }}>
            Screen Too Small
          </h1>
          <p style={{
            fontSize: '20px',
            margin: 0,
            maxWidth: '500px'
          }}>
            Please rotate your device to landscape mode or use a larger screen to play.
          </p>
        </div>
      ) : (
        <>
          {screen === "addPlayer" && (
            <AddPlayer
              onAddPlayer={handleAddPlayer}
              onCancel={() => setScreen("game")}
            />
          )}
          {screen === "editPlayer" && editingPlayerIndex !== null && (
            <EditPlayer
              player={players[editingPlayerIndex]}
              onUpdatePlayer={handleUpdatePlayer}
              onDeletePlayer={handleDeletePlayer}
              onCancel={() => {
                setScreen("game");
                setEditingPlayerIndex(null);
              }}
            />
          )}
          {screen === "home" && <Home onStart={() => setScreen("setup")} />}
          {screen === "setup" && (
            <Setup
              players={players}
              setPlayers={setPlayers}
              onStartGame={() => setScreen("game")}
            />
          )}
          {screen === "game" && (
            <Game
              players={players}
              setPlayers={setPlayers}
              onReset={() => setScreen("home")}
              onAddPlayer={() => setScreen("addPlayer")}
              onEditPlayer={handleEditPlayer}
            />
          )}
        </>
      )}
    </>
  );
}
