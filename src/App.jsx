import Game from "./pages/Game";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";

export default function App() {
  const [screen, setScreen] = useState("game");
  const [players, setPlayers] = useLocalStorage("players", []);

  // Add 2 placeholder players if none exist on first load
  useEffect(() => {
    if (players.length === 0) {
      setPlayers([
        { name: "Player 1", score: 0 },
        { name: "Player 2", score: 0 }
      ]);
    }
  }, []);

  return (
    <>
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
        />
      )}
    </>
  );
}
