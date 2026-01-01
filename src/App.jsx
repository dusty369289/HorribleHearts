import Game from "./pages/Game";
import AddPlayer from "./pages/AddPlayer";
import EditPlayer from "./pages/EditPlayer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";

export default function App() {
  const [screen, setScreen] = useState("game");
  const [players, setPlayers] = useLocalStorage("players", []);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);

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
  );
}
